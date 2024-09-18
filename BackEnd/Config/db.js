const mysql = require('mysql');

// Creating a MySQL connection pool
var pool = mysql.createPool({
  connectionLimit: 10, // Adjust the number based on your needs
  host: "localhost",
  user: "root",
  password: 'P@kistan1444',
  database: 'Garage_Management_System'
});

// Exporting the pool instead of a single connection
module.exports = pool;
