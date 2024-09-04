
const express = require('express')
const connectDB = require('../Config/db')
const exportexcel = require('../utils/excelexport')

exports.getcusterexcel = async (req, res) => {
    var userid = req.params.id;

    connectDB.query('SELECT * FROM expenses WHERE id = ?',userid, (err, rows, fields) => {
        if (err) {
            // Handle the error and respond accordingly
            console.error('Error executing query', err);
            return res.status(500).json({
                "Message": "Internal Server Error"
            });
        }

        
          exportexcel(res, rows, 'expenses.xlsx');

    });

  
};

exports.postdata = async (req, res) => {
    try {
        // Extract data from request body
        const { name, vehicles, descriptions, dates, amounts,paymentStatuses} = req.body;
       
        // Ensure all required fields are present
        if (!name || !vehicles || !descriptions || !dates || !amounts || !paymentStatuses ) {
            return res.status(400).json({ Message: "All fields are required" });
        }

        // Execute the query
        const query = 'INSERT INTO `expenses`(`name`, `vehicle`, `description`, `date`, `amount`, `payment_status`) VALUES (?,?,?,?,?,?)';
        await connectDB.query(query, [name, vehicles, descriptions, dates, amounts,paymentStatuses]);

        // Send success response
        res.json({ Message: "Data has been saved" });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};

        

exports.getdata = async (req, res) => {
    connectDB.query('SELECT * FROM expenses', (err, rows, fields) => {
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

exports.deletedata = async (req, res) => {
    const id =req.params.id;
    
        connectDB.query('DELETE FROM expenses WHERE `id` = ?',id, (err,  fields) => {
            if (err) {
                // Handle the error and respond accordingly
                console.error('Error executing query', err);
                return res.status(500).json({
                    "Message": "Internal Server Error"
                });
            }
    
            // Respond with the rows from the database
            res.json({
               'Message' : 'deleted sucessfully'
            });
        });
    };
    
    exports.updatedata = async (req, res) => {
        const id = req.params.id;
        const { name, vehicle, description, date, amount, payment_status} = req.body;
    
        const query = `
            UPDATE expenses
            SET name = ?, vehicle = ?, description = ?, date = ?, amount = ?, payment_status = ?
            WHERE id = ?
        `;
        
        connectDB.query(query, [name, vehicle, description, date, amount, payment_status, id], (err, results) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).json({
                    "Message": "Internal Server Error"
                });
            }
    
            // Check if any rows were affected
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    "Message": "Customer not found"
                });
            }
    
            // Respond with a success message
            res.json({
                'Message': 'Updated successfully'
            });
        });
    };
    
    
    

