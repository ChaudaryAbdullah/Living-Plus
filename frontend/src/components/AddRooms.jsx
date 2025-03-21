"use client";

import { useState, useEffect } from "react";
import "./css/AddRooms.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

const AddRooms = () => {
  const [rentals, setRentals] = useState([]);
  const [formData, setFormData] = useState({
    rentalId: "",
    rtype: "",
    description: "",
    price: "",
    status: "available",
    picture: "",
  });

  // Fetch rentals from the API
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get("http://localhost:5555/rentals");
        console.log("Fetched Rentals:", response.data); // Debugging
        setRentals(response.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          rentalId: "",
          rtype: "",
          description: "",
          price: "",
          status: "available",
          picture: "",
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">
          <div className="form-container">
            <h2 className="page-title">Add Room</h2>
            <div className="divider"></div>
            <form className="add-room-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="rentalId">Select Rental</label>

                <select
                  id="rentalSelect"
                  name="rentalId"
                  value={formData.rentalId}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select a rental</option>
                  {rentals.map((rental) => (
                    <option key={rental._id} value={rental._id}>
                      {rental.rentalName || rental.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rtype">Room Type</label>
                <select
                  id="rtype"
                  name="rtype"
                  value={formData.rtype}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select room type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="picture">Room Picture (URL)</label>
                <input
                  type="text"
                  id="picture"
                  name="picture"
                  value={formData.picture}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddRooms;
