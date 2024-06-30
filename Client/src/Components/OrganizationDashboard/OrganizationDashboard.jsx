import React, { useState } from "react";
import NavigationBar from "../Homepage/Navigationbar";
import OrganizationProjects from "./OrganizationProjects";
import OrganizationProfile from "./OrganizationProfile";
import OrganizationProjectIdeas from "./OrganizationProjectIdeas";

const OrganizationDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white">
          <h1 className="text-lg font-bold p-4">Dashboard</h1>
          <ul>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Profile" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Profile")}
            >
              Profile
            </li>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Projects" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Projects")}
            >
              Projects
            </li>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Project Ideas" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Project Ideas")}
            >
              Project Ideas
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">{selectedOption}</h2>
          {/* Render content based on selectedOption */}
          {selectedOption === "Profile" && (
            <OrganizationProfile />
          )}
          {selectedOption === "Projects" && (
            <OrganizationProjects />
          )}
          {selectedOption === "Project Ideas" && (
            <OrganizationProjectIdeas />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
