
const express = require('express')
const connectDB = require('../Config/db')

const exportexcel = require('../utils/excelexport')


exports.postdata = async (req, res) => {

    const data = {
        name:req.body.names,
        job_title: req.body.jobTitles,
        date: req.body.dates,
        salary: req.body.salaries,
        salary_status:req.body.salaryStatuses,
    }

   
    try {
        // Extract data from request body
        const { name, job_title, date, salary, salary_status} = data;


        // Ensure all required fields are present
        if (!name || !job_title || !date || !salary || !salary_status ) {
            return res.status(400).json({ Message: "All fields are required" });
        }

        // Execute the query
        const query = 'INSERT INTO `employeesalaary`(`name`, `job_title`, `date`, `salary`, `salary_status`) VALUES (?, ?, ?, ?, ?)';
        await connectDB.query(query, [name, job_title, date, salary, salary_status]);

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

    connectDB.query('SELECT * FROM employeesalaary WHERE id = ?',userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        
          exportexcel(res, rows, 'employeesallary.xlsx');

    });

  
};  

exports.getdata = async (req, res) => {
    connectDB.query('SELECT * FROM employeesalaary', (err, rows, fields) => {
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



