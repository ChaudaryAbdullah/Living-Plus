"use client";

import { Link } from "react-router-dom";
import {
  Home,
  Plus,
  ClipboardList,
  Settings,
  MessageSquare,
  LogOut,
} from "lucide-react";
import "./css/renter-sidebar.css";

const RenterSidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: "discover", path: "/", icon: <Home size={24} />, label: "Discover" },
    { id: "apply-hostel", path: "/apply-rental", icon: <Home size={24} />, label: "Apply Hostel" },
    { id: "apply-rooms", path: "/apply-rental", icon: <Plus size={24} />, label: "Apply Rooms" },
    { id: "request-parking", path: "/applyParking", icon: <ClipboardList size={24} />, label: "Request Parking" },
    { id: "add-ratings", path: "/give-feedback", icon: <Settings size={24} />, label: "Add Ratings" },
    { id: "messages", path: "/messages", icon: <MessageSquare size={24} />, label: "Messages" },
    { id: "logout", path: "/", icon: <LogOut size={24} />, label: "Logout" },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}>
              <Link to={item.path} className="sidebar-link" onClick={() => handleItemClick(item.id)}>
                <div className="sidebar-icon">{item.icon}</div>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RenterSidebar;
