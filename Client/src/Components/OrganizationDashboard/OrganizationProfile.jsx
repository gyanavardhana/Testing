import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const EditableField = ({ label, value, name, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}:</label>
      <TextField
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full"
        variant="outlined"
      />
    </div>
  );
};

const DisplayField = ({ label, value }) => {
  return (
    <div className="mb-4">
      <p className="font-semibold">{label}:</p>
      {Array.isArray(value) ? (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">{value}</p>
      )}
    </div>
  );
};

const OrganizationProfile = () => {
  axios.defaults.withCredentials = true;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Example Organization",
    email: "example@example.com",
    sector: "Technology",
    phoneNumber: "123-456-7890",
    description: "This is a description of the organization.",
    githubUsername: "exampleorg",
  });

  useEffect(() => {
    fetchOrganizationProfile();
  }, []);

  const fetchOrganizationProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}org/profile`);
      setFormData(response.data.organizationProfile);
    } catch (error) {
      console.error("Error fetching organization profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_URL}org/editprofile`, formData);
      console.log("Organization profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating organization profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Organization Profile</h2>
      {editMode ? (
        <div>
          {/* Editable fields */}
          <EditableField label="Name" value={formData.name} name="name" onChange={handleInputChange} />
          <EditableField label="Email" value={formData.email} name="email" onChange={handleInputChange} />
          <EditableField label="Sector" value={formData.industry} name="sector" onChange={handleInputChange} />
          <EditableField label="Phone Number" value={formData.contact} name="phoneNumber" onChange={handleInputChange} />
          <EditableField label="Description" value={formData.description} name="description" onChange={handleInputChange} />

          <Button
            onClick={handleSaveClick}
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </Button>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          {/* Display mode */}
          <DisplayField label="Name" value={formData.name} />
          <DisplayField label="Email" value={formData.email} />
          <DisplayField label="Sector" value={formData.industry} />
          <DisplayField label="Phone Number" value={formData.contact} />
          <DisplayField label="Description" value={formData.description} />

          <Button
            onClick={handleEditClick}
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrganizationProfile;
