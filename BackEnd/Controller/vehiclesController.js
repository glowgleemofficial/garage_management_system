
const express = require('express')
const connectDB = require('../Config/db')

const exportexcel = require('../utils/excelexport')

exports.getcusterexcel = async (req, res) => {
    var userid = req.params.id;

    connectDB.query('SELECT * FROM vehicles WHERE id = ?',userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        
          exportexcel(res, rows, 'vehicles.xlsx');

    });

  
};

exports.postdata = async (req, res) => {
    try {
       
     
        // Extract data from request body
        const { names, vehicles, descriptions, dates, locations, charges} = req.body;

        // Ensure all required fields are present
        if (!names ||!vehicles ||!descriptions || !dates || !locations || !charges ) {
            return res.status(400).json({ Message: "All fields are required" });
        }

       
        // Execute the query
        const query = 'INSERT INTO `vehicles`(`name`, `vehicle`, `description`, `date`, `location`, `charges`) VALUES (?,?,?,?,?,?)';
        await connectDB.query(query, [names, vehicles, descriptions, dates, locations, charges]);

        // Send success response
        res.json({ Message: "Data has been saved" });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};

        

exports.getdata = async (req, res) => {
    connectDB.query('SELECT * FROM vehicles', (err, rows, fields) => {
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



