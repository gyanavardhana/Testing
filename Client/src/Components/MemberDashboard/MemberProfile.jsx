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
      <ul className="list-disc list-inside">
        {Array.isArray(value) ? (
          value.map((interest, index) => (
            <li key={index} className="text-gray-700">{interest}</li>
          ))
        ) : (
          <li className="text-gray-700">{value}</li>
        )}
      </ul>
    </div>
  );
};


const MemberProfile = () => {
  axios.defaults.withCredentials = true;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    skills: [],
    githubUsername: "",
    contact: "",
    interests: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchMemberProfile();
  }, []);

  const fetchMemberProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}mem/memberprofile`);
      const userData = response.data;

      if (Array.isArray(userData.skills)) {
        setFormData({ ...formData, ...userData });
      } else {
        setFormData({ ...formData, ...userData, skills: [userData.skills] });
      }
    } catch (error) {
      console.error("Error fetching member profile:", error);
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
      await axios.patch(`${import.meta.env.VITE_APP_URL}mem/editprofile`, formData);
      console.log("Member profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating member profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Member Profile</h2>
      {editMode ? (
        <div>
          <EditableField label="Name" value={formData.name} name="name" onChange={handleInputChange} />
          <EditableField label="Email" value={formData.email} name="email" onChange={handleInputChange} />
          <EditableField label="Skills" value={formData.skills} name="skills" onChange={handleInputChange} />
          <EditableField label="Contact" value={formData.contact} name="contact" onChange={handleInputChange} />
          <EditableField label="Interests" value={formData.interests} name="interests" onChange={handleInputChange} />
          <EditableField label="Twitter" value={formData.twitter} name="twitter" onChange={handleInputChange} />
          <EditableField label="GitHub" value={formData.github} name="github" onChange={handleInputChange} />
          <EditableField label="LinkedIn" value={formData.linkedin} name="linkedin" onChange={handleInputChange} />

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
          <DisplayField label="Name" value={formData.name} />
          <DisplayField label="Email" value={formData.email} />
          <DisplayField label="Skills" value={formData.skills} />
          <DisplayField label="Contact" value={formData.contact} />
          <DisplayField label="Interests" value={formData.interests} />
          <DisplayField label="Twitter" value={formData.twitter} />
          <DisplayField label="GitHub" value={formData.github} />
          <DisplayField label="LinkedIn" value={formData.linkedin} />

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

export default MemberProfile;