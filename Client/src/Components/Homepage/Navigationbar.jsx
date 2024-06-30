import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Assuming you have axios installed
import Logout from "../Login/Logout";
import { AccountCircle, Dashboard } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton } from "@mui/material"; // Import ListItemButton
import Conf from "../Videochat/Conf";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to fetch user type based on the decoded JWT token
    const fetchUserType = async () => {
      const token = getCookie("jwt"); // Get the JWT token from cookies
    
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}usertype`);
          const userType = response.data; // Accessing the data property of the response
    
          setUserType(userType); // Setting user type
          setIsLoggedIn(true); // Marking user as logged in
        } catch (error) {
          // Handle error
          console.error("Error fetching user type:", error);
        }
      }
    
      setIsLoading(false); // Marking loading as complete
    };
    

    fetchUserType();
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logic for logout
    setIsLoggedIn(false);
    handleClose();
    // Clear the token from cookies
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold">
          CoLab Pro
        </Link>
        <div className="flex items-center">
          <div className="mr-4">
            <Link
              to="/projects"
              className="hover:text-gray-300 transition duration-300"
            >
              Projects
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/projectideas"
              className="hover:text-gray-300 transition duration-300"
            >
              Project Ideas
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/community"
              className="hover:text-gray-300 transition duration-300"
            >
              Community
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/contactus"
              className="hover:text-gray-300 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/video-chat"
              className="hover:text-gray-300 transition duration-300"
            >
              video
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/resources"
              className="hover:text-gray-300 transition duration-300"
            >
              Resources
            </Link>
          </div>
          <div className="mr-4">
            <Link
              to="/chat"
              className="hover:text-gray-300 transition duration-300"
            >
              Chat
            </Link>
          </div>
          <div className="relative">
            <IconButton
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-controls="navbar-menu"
              color="inherit"
            >
              {isLoggedIn ? <Dashboard /> : <AccountCircle />}
            </IconButton>
            <Menu
  id="navbar-menu"
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  {isLoggedIn && (userType === "organization" || userType === "member") ? (
    [
      <MenuItem key="dashboard" onClick={handleClose}>
        <ListItemButton component={Link} to="/dashboard">Dashboard</ListItemButton>
      </MenuItem>,
      <MenuItem key="logout" onClick={handleLogout}><Logout /></MenuItem>
    ]
  ) : (
    [
      <MenuItem key="login" onClick={handleClose}>
        <ListItemButton component={Link} to="/login">Login</ListItemButton>
      </MenuItem>,
      <MenuItem key="signup" onClick={handleClose}>
        <ListItemButton component={Link} to="/signup">Signup</ListItemButton>
      </MenuItem>
    ]
  )}
</Menu>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
