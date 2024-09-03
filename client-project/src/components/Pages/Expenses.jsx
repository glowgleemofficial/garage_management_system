import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { saveAs } from 'file-saver';
import Navigation from './Navigation';
import BarChart from '../BarChart';

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [vehicles, setVehicles] = useState([null]); // Default value for vehicles
  const [descriptions, setDescriptions] = useState([null]); // Default value for descriptions
  const [name, setnames] = useState([null]); // Default value for descriptions
  const [dates, setDates] = useState([new Date()]); // Default date for the first row 
  const [amounts, setAmounts] = useState([null]); // Changed from advances to amounts
  const [paymentStatuses, setPaymentStatuses] = useState([null]); // Default value for payment statuses
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [taskData, setTaskData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [searchName, setSearchName] = useState('');

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDropdownChange = (value, index, type) => {
    switch (type) {
      case "vehicle":
        const newVehicles = [...vehicles];
        newVehicles[index] = value;
        setVehicles(newVehicles);
        break;
      case "description":
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
        break;
      case "paymentStatus":
        const newStatuses = [...paymentStatuses];
        newStatuses[index] = value;
        setPaymentStatuses(newStatuses);
        break;
      default:
        break;
    }
    setDropdownOpen(null); // Close dropdown after selection
  };

  const handleDateChange = (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
  };

  const downloadExcel = (id) => {
    axios.get(`http://localhost:5000/expense/getexcel/${id}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'data.xlsx');
      })
      .catch((error) => {
        console.error('There was an error downloading the Excel file!', error);
      });
  };


  const handleSubmit = async () => {
    const formData = {
      name,
      vehicles,
      descriptions,
      dates,
      amounts,
      paymentStatuses,
    };

    try {
      const result = await fetch("http://localhost:5000/expense/post/Eexpenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      fetchData();

      // Optionally handle response or update state after successful POST
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/expense/get/Eexpenses");
      const data = await response.json();
      setTaskData(data.rows);
      setFilteredData(data.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

   
  useEffect(() => {
    filterData();
  }, [dateFilter, searchName]);


  const resetFilters = () => {

    setDateFilter({ start: '', end: '' });
    setSearchName('');
    setFilteredData(taskData); // Reset to original data
  };

  const filterData = () => {
    let data = taskData;

    if (dateFilter.start && dateFilter.end) {
      data = data.filter(invoice =>
        invoice.date >= dateFilter.start && invoice.date <= dateFilter.end
      );
    }

    if (searchName) {
      data = data.filter(invoice =>
        invoice.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredData(data);
  };

  const chartLabels = filteredData.map(item => item.date);
  const chartData = filteredData.map(item => item.amount);

  return (
    <div className="bg-gray-100  flex">
      <aside className="w-64 bg-white text-white flex-shrink-0 fixed h-full">
        <div className="p-6">
          <img
            className="w-24 h-24 text-white p-2"
            src={Logo}
            alt="Logo"
          />
         <Navigation/>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white shadow p-7 flex items-center">
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Expenses</h2>
          <div className="flex-1 flex justify-center ml-60">
         
          </div>
          <div className="w-8 h-8 cursor-pointer hover:red-300">
            <img src={Notification} alt="icon" />
          </div>
          <button className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm"  onClick={handleSubmit}>
          Submit
          </button>
        </header>
        <div className="bg-white shadow p-10 flex items-center justify-center ">
          <div className="filters">

            <input
              type="date"
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs mx-4"
              value={dateFilter.start}
              onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
              placeholder="Start Date"
            />
            <input
              type="date"
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs mx-4"
              value={dateFilter.end}
              onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
              placeholder="End Date"
            />
            <input
              type="text"
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs mx-4"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search Company"
            />
            <button onClick={resetFilters} className="bg-[#ea8732] text-white px-6 py-1 rounded-md">
              Reset
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl h-96">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-left">Comany Name</th>
                  <th className="py-3 px-20 bg-gray-200 text-[#3d3d3d] text-center">Vehicle</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Description</th>
                  <th className="py-3 px-10 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Amount</th> {/* Updated Header */}
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-center">Payment Status</th>
                  {/* <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-center">Download Data</th> */}
                </tr>
              </thead>
              <tbody>
  <tr className="text-[#3d3d3d] border-t">
    <td className="py-3 px-4 text-left text-xs">
      <input
        type="text"
        className="w-full py-1 px-2 border rounded"
        placeholder="Enter Company Name"
        onChange={(e) => {
          const newname = [...name];
          newname[0] = e.target.value;
          setnames(newname);
        }}
      />
    </td>
    <td className="py-3 px-4 text-center text-xs">
      <div className="relative inline-block">
        <button
          className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
          type="button"
          onClick={() => toggleDropdown(0)}
        >
          {vehicles[0] || "Choose Vehicle"}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownOpen === 0 && (
          <div className="absolute mt-2 w-full py-1 bg-white border border-gray-300 rounded shadow-lg">
            {[
              "Crane: 25-Ton",
              "Crane: 50-Ton",
              "Crane: 70-Ton",
              "Crane: 100-Ton",
              "Forklift: 3-Ton",
              "Forklift: 5-Ton",
              "Forklift: 7-Ton",
              "Forklift: 10-Ton",
              "Boomloader: 523",
              "Boomloader: 540",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleDropdownChange(item, 0, "vehicle")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </td>
    <td className="py-3 px-4 text-center text-xs">
      <input
        type="text"
        className="w-full py-1 px-2 border rounded"
        placeholder="Description"
        value={descriptions[0] || ""}
        onChange={(e) => {
          const newDescriptions = [...descriptions];
          newDescriptions[0] = e.target.value;
          setDescriptions(newDescriptions);
        }}
      />
    </td>
    <td className="py-3 px-4 text-center text-xs">
      <DatePicker
        selected={dates[0]}
        onChange={(date) => handleDateChange(date, 0)}
        className="text-center bg-white border rounded w-full py-1 px-3"
        dateFormat="dd/MM/yyyy"
      />
    </td>
    <td className="py-3 px-4 text-center text-xs">
      <input
        type="number"
        className="w-full py-1 px-2 border rounded"
        placeholder="0"
        value={amounts[0] || ""}
        onChange={(e) => {
          const newAmounts = [...amounts];
          newAmounts[0] = e.target.value;
          setAmounts(newAmounts);
        }}
      />
    </td>
    <td className="py-3 px-4 text-center text-xs">
      <div className="relative inline-block">
        <button
          className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
          type="button"
          onClick={() => toggleDropdown(1)}
        >
          {paymentStatuses[0] || "Choose Status"}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownOpen === 1 && (
          <div className="absolute mt-2 w-full py-1 bg-white border border-gray-300 rounded shadow-lg">
            {["Online", "Cash"].map((status) => (
              <button
                key={status}
                onClick={() => handleDropdownChange(status, 0, "paymentStatus")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </td>
  </tr>

  {/* Empty rows */}
  {filteredData.map((task, index) => (
    <tr key={index} className="border-t">
      <td className="py-3 px-6 text-left text-xs">{task.name}</td>
      <td className="py-3 px-6 text-center text-xs">{task.vehicle}</td>
      <td className="py-3 px-6 text-center text-xs">{task.description}</td>
      <td className="py-3 px-6 text-center text-xs">{task.date}</td>
      <td className="py-3 px-6 text-center text-xs">{task.amount}</td>
      <td className="py-3 px-6 text-center text-xs">{task.payment_status}</td>
      {/* <td className="py-3 px-6 text-center text-xs"> <button className='bg-[#ea8732] p-1 rounded-md text-white font-medium'   onClick={() => downloadExcel(task.id)}>
      Download Excel
    </button></td> */}
    </tr>
  ))}

  {/* 10 additional empty rows */}
  {[...Array(20)].map((_, index) => (
    <tr key={index} className="border-t">
      <td className="py-3 px-6 text-left text-xs"></td>
      <td className="py-3 px-6 text-center text-xs"></td>
      <td className="py-3 px-6 text-center text-xs"></td>
      <td className="py-3 px-6 text-center text-xs"></td>
      <td className="py-3 px-6 text-center text-xs"></td>
      <td className="py-3 px-6 text-center text-xs"></td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
        <div className="bg-white shadow flex items-center justify-center ">
        <  BarChart chartData={chartData} chartLabels={chartLabels} />
        </div>
      </div>
    </div>
  );
}

export default Employeetask;
