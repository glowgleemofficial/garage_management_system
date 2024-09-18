// customer.js (Routes)

const express = require('express');
const router = express.Router();
const { postdata, getdata, getcusterexcel, deletedata, updatedata, chartdata } = require('../Controller/customerController'); // Adjust the path to customerController

// Define routes and associate them with controller functions
router.post('/post/E-customer', postdata);
router.get('/getexcelcustomer/:id', getcusterexcel);
router.delete('/delete/:id', deletedata);
router.put('/update/:id', updatedata);
router.get('/get/E-customer', getdata);
router.get('/chartdata', chartdata);

module.exports = router;
