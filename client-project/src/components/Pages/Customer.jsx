import React, { useState, useEffect } from 'react';
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { saveAs } from 'file-saver';
import Navigation from './Navigation';

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [vehicles, setVehicles] = useState([null]); // Default value for vehicles
  const [descriptions, setDescriptions] = useState(); // Default value for descriptions
  const [dates, setDates] = useState([new Date()]); // Default date for the first row
  const [contacts, setContacts] = useState([null]); // Default value for contacts
  const [deals, setDeals] = useState([null]); // Default value for deals
  const [names, setNames] = useState(); // State for names
  const [customers, setCustomers] = useState([null]); // Default value for customers
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
      case "deal":
        const newDeals = [...deals];
        newDeals[index] = value;
        setDeals(newDeals);
        break;
      case "customer":
        const newCustomers = [...customers];
        newCustomers[index] = value;
        setCustomers(newCustomers);
        break;
      case "contact":
        const newContacts = [...contacts];
        newContacts[index] = value;
        setContacts(newContacts);
        break;
      default:
        break;
    }
    setDropdownOpen(null); // Close dropdown after selection
  };


  const downloadExcel = (id) => {
    axios.get(`http://localhost:5000/customer/getexcelcustomer/${id}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'data.xlsx');
      })
      .catch((error) => {
        console.error('There was an error downloading the Excel file!', error);
      });
  };

  const handleDateChange = (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
  };

  const handleSubmit = async () => {
    const formData = {
      names,
      vehicles,
      descriptions,
      dates,
      contacts,
      deals,
      customers,
    };

    try {
      const result = await fetch("http://localhost:5000/customer/post/E-customer", {
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
      const response = await fetch("http://localhost:5000/customer/get/E-customer");
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


  return (
    <div className="bg-gray-100 h-screen flex">
      <aside className="w-64 bg-white text-white flex-shrink-0 fixed h-full">
        <div className="p-6">
          <img className="w-24 h-24 text-white p-2" src={Logo} alt="Logo" />
          <Navigation />
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white shadow p-7 flex items-center">
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Customers</h2>
          <div className="flex-1 flex justify-center ml-">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs"
            />
          </div>
          <div className="w-8 h-8 cursor-pointer hover:red-300">
            <img src={Notification} alt="icon" />
          </div>
          <button className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm" onClick={handleSubmit}>
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
              placeholder="Search Customer"
            />
            <button onClick={resetFilters} className="bg-[#ea8732] text-white px-6 py-1 rounded-md">
              Reset
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-left">Name</th>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-center">Vehicle</th>
                  <th className="py-3 px-7 bg-gray-200 text-[#3d3d3d] text-center">Description</th>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-8 bg-gray-200 text-[#3d3d3d] text-center">Contact</th>
                  <th className="py-3 px-7 bg-gray-200 text-[#3d3d3d] text-center">Amount</th>
                  <th className="py-3 px-7 bg-gray-200 text-[#3d3d3d] text-center">Customer</th>
                  {/* <th className="py-3 px-7 bg-gray-200 text-[#3d3d3d] text-center">Download data</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="text-[#3d3d3d] border-t">
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        setNames(e.target.value);
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
                        {vehicles[0] || "Select Vehicle"}
                      </button>
                      {dropdownOpen === 0 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
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
                            ].map((vehicle, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(vehicle, 0, "vehicle")}
                              >
                                {vehicle}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Description"
                      onChange={(e) => {
                        setDescriptions(e.target.value);
                      }}
                    />
                  </td>
                  <td className="py-3 px-10 text-center text-xs">
                    <DatePicker
                      selected={dates[0]}
                      onChange={(date) => handleDateChange(date, 0)}
                      dateFormat="MM/dd/yyyy"
                      className="w-full py-1 px-2 border rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Contact"
                      value={contacts[0] || ""}
                      onChange={(e) => handleDropdownChange(e.target.value, 0, "contact")}
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(1)}
                      >
                        {deals[0] || "Select Deal"}
                      </button>
                      {dropdownOpen === 1 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            {["Cash", "Online"].map((deal, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(deal, 0, "deal")}
                              >
                                {deal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(2)}
                      >
                        {customers[0] || "Select Customer"}
                      </button>
                      {dropdownOpen === 2 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            {["Old", "New"].map((customer, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(customer, 0, "customer")}
                              >
                                {customer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Render rows based on taskData */}
                {filteredData.map((customer, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-6 text-left text-xs">{customer.name}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.vehicle}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.description}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.date}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.contact}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.deals}</td>
                    <td className="py-3 px-6 text-center text-xs">{customer.customer}</td>
                    {/* <td className="py-3 px-6 text-center text-xs"> <button className='bg-[#ea8732] p-1 rounded-md text-white font-medium'   onClick={() => downloadExcel(customer.id)}>
      Download Excel
    </button></td> */}
                  </tr>
                ))}

                {/* Add 10 empty rows */}
                {[...Array(20)].map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-6 text-left text-xs"></td>
                    <td className="py-3 px-6 text-center text-xs"></td>
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
      </div>
    </div>
  );
}

export default Employeetask;
