import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationDashboard from './OrganizationDashboard/OrganizationDashboard';
import MemberDashboard from './MemberDashboard/MemberDashboard';

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}usertype`);
        console.log(response); // Replace this with your actual endpoint to fetch user type
        setUserType(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user type:', error);
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return userType === 'organization' ? <OrganizationDashboard /> : <MemberDashboard />;
};

export default Dashboard;
