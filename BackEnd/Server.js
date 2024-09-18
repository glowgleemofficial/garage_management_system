const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Port = 5000;
const cors = require('cors');

// Importing the MySQL connection
const connectDB = require('./Config/db');

// create application/json parser
app.use(cors()); // To allow cross-origin requests
app.use(express.json());


// Route to fetch dashboard data
app.get('/api/dashboard-data', (req, res) => {
    const data = {};
  
    // Query to count customers
    connectDB.query('SELECT COUNT(*) AS count FROM customers', (err, result) => {
        if (err) return res.status(500).send(err);
        data.customers = result[0].count;

        // Query to count pending items
        connectDB.query('SELECT COUNT(*) AS count FROM pending', (err, result) => {
            if (err) return res.status(500).send(err);
            data.pending = result[0].count;

            // Query to count vehicles
            connectDB.query('SELECT COUNT(*) AS count FROM vehicles', (err, result) => {
                if (err) return res.status(500).send(err);
                data.vehicles = result[0].count;

                // Query to count invoices
                connectDB.query('SELECT COUNT(*) AS count FROM invoice', (err, result) => {
                    if (err) return res.status(500).send(err);
                    data.invoice = result[0].count;

                    // Query to count employee tasks
                    connectDB.query('SELECT COUNT(*) AS count FROM employee_task', (err, result) => {
                        if (err) return res.status(500).send(err);
                        data.employee_task = result[0].count;

                        // Finally send the data
                        res.json(data);
                    });
                });
            });
        });
    });
});

// Mounting the Routes
const employeeSalary = require('./Routes/employeeSalary');
const employeeTask = require('./Routes/employeeTask');
const expense = require('./Routes/expenses');
const income = require('./Routes/income');
const invoice = require('./Routes/invoice');
const customer = require('./Routes/customer');
const pending = require('./Routes/pending');
const vehicles = require('./Routes/vehicles');

// Routes Track
app.use('/employeesalary', employeeSalary);
app.use('/employeetask', employeeTask);
app.use('/expense', expense);
app.use('/income', income);
app.use('/invoice', invoice);
app.use('/customer', customer);
app.use('/pending', pending);
app.use('/vehicles', vehicles);

// The Server is Listening on Port 5000
app.listen(Port, '77.37.49.209', () => {
  console.log(`Server is running on ${Port}`);
});
