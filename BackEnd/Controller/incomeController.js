
const express = require('express')
const connectDB = require('../Config/db')
const exportexcel = require('../utils/excelexport')

exports.getcusterexcel = async (req, res) => {
    var userid = req.params.id;

    connectDB.query('SELECT * FROM income WHERE id = ?',userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        
          exportexcel(res, rows, 'income.xlsx');

    });

  
};

exports.postdata = async (req, res) => {
    try {

        console.log(req.body);
        // Extract data from request body
        const { names, descriptions, dates, salaries,salaryStatuses} = req.body;

        // Ensure all required fields are present
        if (!names || !descriptions || !dates || !salaries || !salaryStatuses ) {
            return res.status(400).json({ Message: "All fields are required" });
        }

       
        // Execute the query
        const query = ' INSERT INTO `income`(`name`, `description`, `date`, `salary`, `salary_status`)  VALUES (?,?,?,?,?)';
        await connectDB.query(query, [names, descriptions, dates, salaries,salaryStatuses]);

        // Send success response
        res.json({ Message: "Data has been saved" });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};

        

exports.getdata = async (req, res) => {
    connectDB.query('SELECT * FROM income', (err, rows, fields) => {
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



