
const express = require('express')
const connectDB = require('../Config/db')
const exportexcel = require('../utils/excelexport')



exports.postdata = async (req, res) => {
    try {

        // Extract data from request body
        const { names, vehicles, descriptions, dates, contacts, deals, customers } = req.body;

        // Ensure all required fields are present
        if (!names || !vehicles || !descriptions || !dates || !contacts || !deals || !customers) {
            return res.status(400).json({ Message: "All fields are required" });
        }


        // Execute the query
        const query = ' INSERT INTO `customers`(`name`, `vehicle`, `description`, `date`, `contact`, `deals`, `customer`)  VALUES (?,?,?,?,?,?,?)';
        await connectDB.query(query, [names, vehicles, descriptions, dates, contacts, deals, customers]);

        // Send success response
        res.json({ Message: "Data has been saved" });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};


exports.getcusterexcel = async (req, res) => {
    var userid = req.params.id;

    connectDB.query('SELECT * FROM customers WHERE id = ?', userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }


        exportexcel(res, rows, 'users.xlsx');

    });


};

exports.chartdata = async (req, res) => {
    const { startDate, endDate } = req.query;

    // SQL query to filter data by date range
    const query = `
    SELECT date, COUNT(*) as count 
    FROM customers 
    WHERE date BETWEEN ? AND ?
    GROUP BY date
    ORDER BY date ASC`;

    connectDB.query(query, [startDate, endDate], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.getdata = async (req, res) => {

    connectDB.query('SELECT * FROM customers', (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        // Respond with the rows from the database
        res.json({
            rows
        });
    });
};



