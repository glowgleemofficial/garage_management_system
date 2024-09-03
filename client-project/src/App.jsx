import {Route, Routes } from"react-router-dom"
import Pending from"./components/Pages/Pending"
import Expenses from"./components/Pages/Expenses"
import Signin from './components/Pages/Signin';
import Home from"./components/Home"
import Vehicle from"./components/Pages/Vehicle"
import Customer from"./components/Pages/Customer"
import Invoice from"./components/Pages/Invoice"
import Income from"./components/Pages/Income"
import Employeetask from"./components/Pages/Employeetask"
import Employeesalary from"./components/Pages/Employeesalary"
import Report from"./components/Pages/Report"

function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/pending" element={<Pending />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/vehicle" element={<Vehicle />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/invoice" element={<Invoice />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/employeetask" element={<Employeetask />}></Route>
        <Route path="/employeesalary" element={<Employeesalary />}></Route>
        <Route path="/report" element={<Report />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
