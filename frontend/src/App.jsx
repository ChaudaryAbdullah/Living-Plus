import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import RentalView from "./components/rental-view";
import AddRooms from "./components/AddRooms";
import ApplyRental from "./components/apply-rental";
import ApplyParking from "./components/applyParking";
import ApproveApplicants from "./components/approveApplicants";
import RegisterHostel from "./components/register-hostel";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rental-view" element={<RentalView />} />
          <Route path="/addRooms" element={<AddRooms />} />
          <Route path="/apply-rental" element={<ApplyRental />} />
          <Route path="/applyParking" element={<ApplyParking />} />
          <Route path="/approveApplicants" element={<ApproveApplicants />} />
          <Route path="/register-hostel" element={<RegisterHostel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
