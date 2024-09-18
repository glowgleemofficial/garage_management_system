var mysql = require('mysql');

var connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'P@kistan1444',
  database: 'Garage_Management_System'
});

connectDB.connect(function(err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

module.exports= connectDB;