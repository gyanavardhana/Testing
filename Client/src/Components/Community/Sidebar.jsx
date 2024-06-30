import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col h-screen">
      <div className="p-4 bg-gray-800">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <ul className="flex-1 overflow-y-auto">
        <li onClick={() => onTabChange('discussions')} className={`p-4 cursor-pointer ${activeTab === 'discussions' ? 'bg-gray-700' : ''}`}>Discussions</li>
        <li onClick={() => onTabChange('community-challenges')} className={`p-4 cursor-pointer ${activeTab === 'community-challenges' ? 'bg-gray-700' : ''}`}>Community Challenges</li>
        <li onClick={() => onTabChange('polls')} className={`p-4 cursor-pointer ${activeTab === 'polls' ? 'bg-gray-700' : ''}`}>Polls</li>
        <li onClick={() => onTabChange('ai-projects')} className={`p-4 cursor-pointer ${activeTab === 'ai-projects' ? 'bg-gray-700' : ''}`}>Project analysis</li>
        <li onClick={() => onTabChange('ai-resources')} className={`p-4 cursor-pointer ${activeTab === 'ai-resources' ? 'bg-gray-700' : ''}`}>AI Resources</li>
        <li onClick={() => onTabChange('ai-events')} className={`p-4 cursor-pointer ${activeTab === 'ai-events' ? 'bg-gray-700' : ''}`}>AI Events</li>
      </ul>
    </div>
  );
};

export default Sidebar;
