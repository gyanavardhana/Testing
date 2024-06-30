import React from 'react';

const Functionalities = () => {
  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Platform Functionalities Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Common Pages */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Home/Landing Page:</h3>
          <p>Displays all organization projects and project ideas.</p>
          <p>Provides links to login/register pages.</p>
          <p>Offers an overview of platform functionalities.</p>
          <p>Allows members to view project details and contact project leads.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Login/Signup Page:</h3>
          <p>Separate forms for Organizations and Members.</p>
          <p>Allows registration and login with necessary details.</p>
        </div>
        
        {/* Organization Pages */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Dashboard:</h3>
          <p>Project creation and management interface.</p>
          <p>Posting projects and project ideas.</p>
          <p>Managing projects and project ideas.</p>
          <p>Access to chat and collaboration features.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Organization Listing Page:</h3>
          <p>Lists registered organizations.</p>
          <p>Allows organizations to post new projects.</p>
        </div>
        
        {/* Member Pages */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Dashboard:</h3>
          <p>Browse available projects from various organizations.</p>
          <p>Filter projects based on skills, technology, or keywords.</p>
          <p>Apply to join project teams.</p>
          <p>Access to chat and collaboration features.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Project View Page:</h3>
          <p>Detailed information about specific projects.</p>
          <p>Includes project description, budget, team members, and open positions.</p>
          <p>Chat functionality for project team members.</p>
          <p>Option to schedule Google Meet for project discussions.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Profile Page:</h3>
          <p>View and edit profile information (skills, experience, etc.).</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Project Ideas Page:</h3>
          <p>Lists project ideas posted by organizations seeking members.</p>
          <p>Allows members to view idea details and contact project leads.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Team Members Page:</h3>
          <p>Lists all members of a specific project.</p>
          <p>Provides a profile page for each member, showcasing their skills and experience.</p>
          <p>Allows members to chat with each other and project leads.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Chat Page:</h3>
          <p>Dedicated chat application for project teams.</p>
          <p>Allows real-time communication between members and project leads.</p>
        </div>
      </div>
    </div>
  );
};

export default Functionalities;
