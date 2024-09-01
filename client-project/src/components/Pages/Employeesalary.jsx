import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { saveAs } from 'file-saver';
import Navigation from "./Navigation";

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [jobTitles, setJobTitles] = useState([null]); // Default value for job titles
  const [dates, setDates] = useState([new Date()]); // Default date for the first row
  const [salaries, setSalaries] = useState([null]); // Default value for salary
  const [salaryStatuses, setSalaryStatuses] = useState([null]); // Default value for salary statuses
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [names, setNames] = useState([""]); // State for names

  const[alljobs,setalljobs]= useState([""]);

 
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDropdownChange = (value, index, type) => {
    switch (type) {
      case "jobTitle":
        const newJobTitles = [...jobTitles];
        newJobTitles[index] = value;
        setJobTitles(newJobTitles);
        break;
      case "salaryStatus":
        const newStatuses = [...salaryStatuses];
        newStatuses[index] = value;
        setSalaryStatuses(newStatuses);
        break;
      default:
        break;
    }
    setDropdownOpen(null); // Close dropdown after selection
  };

  const downloadExcel = (id) => {
    axios.get(`http://77.37.49.209:5000/employeesalary/getexcel/${id}`, { responseType: 'blob' })
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

  // Function to handle form submission
  const handleSubmit = () => {
    const payload = {
      names,
      jobTitles,
      dates,
      salaries,
      salaryStatuses,
    };

    fetch("http://77.37.49.209:5000/employeesalary/post/Esalary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data submitted successfully:", data);
        alldata();
        // Optionally, you can add a success message or handle further actions
      })
      .catch(error => console.error("Error submitting data:", error));
  };

  const alldata = () =>{
    fetch("http://77.37.49.209:5000/employeesalary/get/Esalary")
    .then(response => response.json())
    .then(data => {
      setalljobs(data.rows);
      if (data) {

        setNames(data.name || [""]);
        setJobTitles(data.job_title || [null]);
        setDates(data.date || [new Date()]);
        setSalaries(data.salary || [null]);
        setSalaryStatuses(data.salary_status || [null]);
      }
    })   
    .catch(error => console.error("Error fetching data:", error));
  }
   // Fetch data from API when the component mounts
   useEffect(() => {
    alldata();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex">
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
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Employee Salary</h2>
          <div className="flex-1 flex justify-center ml-">
            {/* <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs"
            /> */}
          </div>
          <div className="w-8 h-8 cursor-pointer hover:red-300">
            <img src={Notification} alt="icon" />
          </div>
          <button
            onClick={handleSubmit}
            className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm"
          >
            Submit
          </button>
        </header>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-left">Name</th>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-center">Job Title</th>
                  <th className="py-3 px-10 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Salary</th>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-center">Salary Status</th>
                  {/* <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-center">Download Data</th> */}
                </tr>
              </thead>
              <tbody>
  {names.map((name, index) => (
    <tr key={index} className="text-[#3d3d3d] border-t">
      <td className="py-3 px-4 text-center text-xs">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            const newNames = [...names];
            newNames[index] = e.target.value;
            setNames(newNames);
          }}
          className="w-full py-1 px-2 border rounded"
          placeholder="Enter Name"
        />
      </td>
      <td className="py-3 px-4 text-left text-xs">
        <div className="relative inline-block">
          <button
            className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
            type="button"
            onClick={() => toggleDropdown(index)}
          >
            {jobTitles[index] || "Choose Job Title"}
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
          {dropdownOpen === index && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
              <ul className="list-none m-0 p-0">
                {[
                  "Crane operator",
                  "Forklift operator",
                  "Boom loader operator",
                  "Mechanic",
                  "Manager",
                  "Accountant",
                ].map((title, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropdownChange(title, index, "jobTitle")}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </td>
      <td className="py-3 px-10 text-center text-xs">
        <DatePicker
          selected={dates[index]}
          onChange={(date) => handleDateChange(date, index)}
          className="w-full py-1 px-2 border rounded"
        />
      </td>
      <td className="py-3 px-4 text-center text-xs">
        <input
          type="number"
          value={salaries[index] || ""}
          onChange={(e) => {
            const newSalaries = [...salaries];
            newSalaries[index] = e.target.value;
            setSalaries(newSalaries);
          }}
          className="w-full py-1 px-2 border rounded"
          placeholder="0"
        />
      </td>
      <td className="py-3 px-4 text-center text-xs">
        <div className="relative inline-block">
          <button
            className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
            type="button"
            onClick={() => toggleDropdown(index + 100)}
          >
            {salaryStatuses[index] || "Choose Status"}
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
          {dropdownOpen === index + 100 && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
              <ul className="list-none m-0 p-0">
                {["Pending", "Paid"].map((status, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropdownChange(status, index, "salaryStatus")}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </td>
    </tr>
  ))}

{alljobs.map((job, index) => (
    <tr key={index} className="border-t">
      <td className="py-3 px-6 text-left text-xs">{job.name}</td>
      <td className="py-3 px-6 text-center text-xs">{job.job_title}</td>
      <td className="py-3 px-6 text-center text-xs">{job.date}</td>
      <td className="py-3 px-6 text-center text-xs">{job.salary}</td>
      <td className="py-3 px-6 text-center text-xs">{job.salary_status}</td>
      {/* <td className="py-3 px-6 text-center text-xs"> <button className='bg-[#ea8732] p-1 rounded-md text-white font-medium'   onClick={() => downloadExcel(job.id)}>
      Download Excel
    </button></td> */}
    </tr>
  ))}

  {/* Empty rows */}
  {Array.from({ length: 20 }).map((_, index) => (
    <tr key={index + names.length} className="border-t">
      <td className="py-3 px-6 text-left text-xs"></td>
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
