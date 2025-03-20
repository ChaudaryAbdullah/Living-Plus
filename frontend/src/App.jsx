import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import RentalView from "./components/rental-view";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rental-view" element={<RentalView />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
