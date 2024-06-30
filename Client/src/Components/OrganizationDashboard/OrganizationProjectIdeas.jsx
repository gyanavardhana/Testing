import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationProjectIdeas = () => {
  axios.defaults.withCredentials = true;
  const [projectIdeas, setProjectIdeas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProjectIdea, setEditedProjectIdea] = useState({
    title: "",
    description: "",
    skillsRequired: [],
  });
  const [newProjectIdea, setNewProjectIdea] = useState({
    title: "",
    description: "",
    skillsRequired: "",
  });

  useEffect(() => {
    fetchProjectIdeas();
  }, []);

  const fetchProjectIdeas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}org/getprojectideas`
      );
      setProjectIdeas(response.data);
    } catch (error) {
      console.error("Error fetching project ideas:", error);
    }
  };

  const handleContactClick = async(id) => {
    const email = await axios.get(`${import.meta.env.VITE_APP_URL}org/getemail/${id}`,)
    window.location.href = `mailto:${email.data}`;
  };

  const handleEditClick = (idea) => {
    setEditMode(true);
    setEditedProjectIdea(idea);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProjectIdea(null);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_URL}org/editprojectidea/${editedProjectIdea._id}`,
        editedProjectIdea
      );
      setEditMode(false);
      setEditedProjectIdea(null);
      fetchProjectIdeas(); // Refresh project ideas after edit
    } catch (error) {
      console.error("Error updating project idea:", error);
    }
  };

  const handleDeleteProjectIdea = async (projectId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}org/deleteprojectidea/${projectId}`
      );
      fetchProjectIdeas(); // Refresh project ideas after deletion
    } catch (error) {
      console.error("Error deleting project idea:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProjectIdea({
      ...editedProjectIdea,
      [name]: value,
    });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProjectIdea({
      ...newProjectIdea,
      [name]: value,
    });
  };

  const handleAddProjectIdea = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_URL}org/postprojectidea`,
        newProjectIdea
      );
      setNewProjectIdea({
        title: "",
        description: "",
        skillsRequired: "",
      });
      fetchProjectIdeas(); // Refresh project ideas after adding new idea
    } catch (error) {
      console.error("Error posting project idea:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Project Ideas</h2>
      {/* Input fields for adding new project idea */}
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={newProjectIdea.title}
          onChange={handleNewInputChange}
          placeholder="Title"
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="description"
          value={newProjectIdea.description}
          onChange={handleNewInputChange}
          placeholder="Description"
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="skillsRequired"
          value={newProjectIdea.skillsRequired}
          onChange={handleNewInputChange}
          placeholder="Skills Required"
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddProjectIdea}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Project Idea
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectIdeas.map((idea, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{idea.title}</h3>
            <p className="mb-2">{idea.description}</p>
            <p className="mb-2">
              <strong>Skills Required:</strong>{" "}
              {idea.skillsRequired.map((skill, index) => (
                <span key={index} className="mr-2">
                  {skill}
                </span>
              ))}
            </p>
            {/* Edit and delete buttons */}
            <div className="flex">
              <button
                onClick={() => handleContactClick(idea.organizationId)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Contact
              </button>

              <button
                onClick={() => handleEditClick(idea)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProjectIdea(idea._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Render edit form if edit mode is active */}
      {editMode && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">Edit Project Idea</h3>
          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedProjectIdea.title}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedProjectIdea.description}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
              rows={4}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="skillsRequired" className="mb-1">
              Skills Required
            </label>
            <input
              type="text"
              id="skillsRequired"
              name="skillsRequired"
              value={editedProjectIdea.skillsRequired}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationProjectIdeas;
