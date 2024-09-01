
const express = require('express')
const connectDB = require('../Config/db')
const exportexcel = require('../utils/excelexport')

exports.getcusterexcel = async (req, res) => {
    var userid = req.params.id;

    connectDB.query('SELECT * FROM pending WHERE id = ?',userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        
          exportexcel(res, rows, 'pending.xlsx');

    });

  
};

exports.postdata = async (req, res) => {
    try {
        
        // Extract data from request body
       
        const { names, locations, dates, advances, pendings, totals,paymentStatuses} = req.body;

        // Ensure all required fields are present
        if (!names ||!locations ||!dates || !advances || !pendings || !totals || !paymentStatuses ) {
            return res.status(400).json({ Message: "All fields are required" });
        }

       
        // Execute the query
        const query = ' INSERT INTO `pending`(`name`, `location`, `date`, `advance`, `pending`, `total`, `payment_status`) VALUES (?,?,?,?,?,?,?)';
        await connectDB.query(query, [names, locations, dates, advances, pendings, totals,paymentStatuses]);

        // Send success response
        res.json({ Message: "Data has been saved" });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};

        

exports.getdata = async (req, res) => {
    connectDB.query('SELECT * FROM pending', (err, rows, fields) => {
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



