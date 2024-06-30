import React, { useState } from 'react';
import axios from 'axios';
import Logout from './Logout';
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';


const MemberLogin = () => {
  axios.defaults.withCredentials = true;
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  async function fetchUserId() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}userId`, {
        withCredentials: true // Send cookies with the request
      });
      console.log("User ID:", response.data.userId);
      setUserId(response.data.userId);

      // Establish socket connection after setting userId
      const newSocket = io(`${import.meta.env.VITE_APP_URL}`, {
        transports: ["websocket", "polling", "flashsocket"],
        auth: {
          userId: response.data.userId
        }
      });

      newSocket.on("connect", () => {
        console.log("Connected to server!");
        // Perform actions based on connection establishment
      });

      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}mem/login`, formData);
      fetchUserId();
      console.log(response.data);
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error); // Handle error
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Member Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default MemberLogin;
