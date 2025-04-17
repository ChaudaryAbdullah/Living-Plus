"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./css/approve-parking.css";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./owner-sidebar";
import "./css/view-ratings.css";
const ApproveParking = () => {
  const [userRentals, setUserRentals] = useState([]); // Rentals owned by user
  const [allParkingRequests, setAllParkingRequests] = useState([]); // All parking requests
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeItem, setActiveItem] = useState("allocate-parking");
  const [activePage, setActivePage] = useState("Approve Parking");
  // Form state
  const [formData, setFormData] = useState({
    rentalId: "",
    parkingSlot: "",
    selectedAction: "",
  });

  const [selectedParking, setSelectedParking] = useState(""); // Selected parking ID

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5555/profile", {
          withCredentials: true,
        });

        setUser(response.data);
        setLoading(false);

        if (response.data?.user?.ownerId) {
          fetchRentalsForUser(response.data.user.ownerId);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch user rentals
  const fetchRentalsForUser = async (ownerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/owns/rentals/${ownerId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setUserRentals(response.data);
      fetchParkingRequestsForAll(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      setError("No rental Found");
    }
  };

  // Fetch parking requests for all rentals
  const fetchParkingRequestsForAll = async (rentals) => {
    try {
      const requests = rentals.map((rental) =>
        axios.get(`http://localhost:5555/parkingRequest/rental/${rental._id}`, {
          withCredentials: true,
        })
      );

      const results = await Promise.all(requests);
      const allRequests = results.flatMap((res) => res.data);

      setAllParkingRequests(allRequests);
    } catch (error) {
      console.error("Error fetching parking requests:", error);
      setError("Failed to load parking requests");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create parking slots
  const handleCreate = async () => {
    try {
      const requests = Array.from(
        { length: Number(formData.parkingSlot) },
        () =>
          axios.post(
            "http://localhost:5555/parkingSlot",
            { rentalId: formData.rentalId },
            { withCredentials: true }
          )
      );

      await Promise.all(requests);
      alert("Parking created Successfully!");
      console.log("Parking created Successfully!");
      fetchParkingRequestsForAll(userRentals);
    } catch (error) {
      console.error("Error creating parking slots:", error);
    }
  };

  // Approve action
  const handleAccept = async () => {
    if (!selectedParking) return alert("Select a parking request to accept.");

    try {
      await axios.post(
        "http://localhost:5555/parkingRequest/accept",
        { slotId: selectedParking },
        { withCredentials: true }
      );
      fetchParkingRequestsForAll(userRentals);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Reject action
  const handleReject = async () => {
    if (!selectedParking) return alert("Select a parking request to reject.");

    try {
      await axios.delete(
        "http://localhost:5555/parkingRequest",
        { slotId: selectedParking },
        { withCredentials: true }
      );
      fetchParkingRequestsForAll(userRentals);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="app-container">
      <Header title={activePage} />
      <div className="main-content">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="main-body">
          <div className="parking-content">
            <h1 className="parking-title">Parking</h1>

            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <div className="form-group">
                  <label>Select Rental</label>
                  <select
                    name="rentalId"
                    value={formData.rentalId}
                    onChange={handleChange}
                    className="form-control"
                    disabled={userRentals.length === 0}
                  >
                    <option value="">Select a rental</option>
                    {userRentals.map((rental) => (
                      <option key={rental._id} value={rental._id}>
                        {rental.rentalName || "Unnamed Rental"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Parking Slots</label>
                  <input
                    type="number"
                    name="parkingSlot"
                    value={formData.parkingSlot}
                    onChange={handleChange}
                  />
                  <button className="create-btn" onClick={handleCreate}>
                    Create
                  </button>
                </div>

                <div className="table-container">
                  <table className="parking-table">
                    <thead>
                      <tr>
                        <th>Tenant Name</th>
                        <th>Parking ID</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allParkingRequests.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="no-data">
                            No parking requests available
                          </td>
                        </tr>
                      ) : (
                        allParkingRequests
                          .filter((request) =>
                            formData.rentalId
                              ? request.rentalId === formData.rentalId
                              : true
                          )
                          .map((request) => (
                            <tr key={request._id}>
                              <td>
                                {request.tenantId?.name || "Unknown Tenant"}
                              </td>
                              <td>{request._id}</td>
                              <td>{request.status || "Pending"}</td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="action-container">
                  <select
                    value={selectedParking}
                    onChange={(e) => setSelectedParking(e.target.value)}
                  >
                    <option value="">Select Tenant & Parking ID</option>
                    {allParkingRequests
                      .filter((request) =>
                        formData.rentalId
                          ? request.rentalId === formData.rentalId
                          : true
                      )
                      .map((request) => (
                        <option key={request._id} value={request._id}>
                          {request.tenantId?.name} - {request._id}
                        </option>
                      ))}
                  </select>
                  <button className="accept-btn" onClick={handleAccept}>
                    Accept
                  </button>
                  <button className="reject-btn" onClick={handleReject}>
                    Reject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApproveParking;
