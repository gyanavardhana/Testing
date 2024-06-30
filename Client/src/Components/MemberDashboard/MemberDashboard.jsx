import React, { useState } from "react";
import NavigationBar from "../Homepage/Navigationbar";
import MemberProfile from "./MemberProfile";
import MemberProjectIdeas from "./MemberProjectIdeas";

const MemberDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 flex flex-col min-h-screen">
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
                selectedOption === "Project Ideas" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Project Ideas")}
            >
              Project Ideas
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">{selectedOption}</h2>
          {/* Render content based on selectedOption */}
          {selectedOption === "Profile" && (
            <MemberProfile />
          )}
          {selectedOption === "Project Ideas" && (
            <MemberProjectIdeas />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
