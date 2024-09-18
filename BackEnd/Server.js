const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Port = 5000;
const cors = require('cors');

// Importing the MySQL connection
const connectDB = require('./Config/db');

// Middleware for body parsing and CORS
app.use(cors());
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

            // Send the accumulated data
            res.json(data);
          });
        });
      });
    });
  });
});

// Mounting the routes (ensure routes are properly imported)
app.use('/employeesalary', require('./Routes/employeeSalary'));
app.use('/employeetask', require('./Routes/employeeTask'));
app.use('/expense', require('./Routes/expenses'));
app.use('/income', require('./Routes/income'));
app.use('/invoice', require('./Routes/invoice'));
app.use('/customer', require('./Routes/customer'));
app.use('/pending', require('./Routes/pending'));
app.use('/vehicles', require('./Routes/vehicles'));

// Start server
app.listen(Port, '0.0.0.0', () => {
  console.log(`Server is running on port ${Port}`);
});
