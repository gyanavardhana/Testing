// Sidebar.js
import React from 'react';

const Sidebar = ({ onSelect, selected }) => {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col h-screen">
      <div className="p-4 bg-gray-800">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <ul className="flex-1 overflow-y-auto">
        <li onClick={() => onSelect('docs')} className={`p-4 cursor-pointer ${selected === 'docs' ? 'bg-gray-700' : ''}`}>Docs Summarizer</li>
        <li onClick={() => onSelect('news')} className={`p-4 cursor-pointer ${selected === 'news' ? 'bg-gray-700' : ''}`}>News Feed</li>
        <li onClick={() => onSelect('careeradvice')} className={`p-4 cursor-pointer ${selected === 'careeradvice' ? 'bg-gray-700' : ''}`}>Career Advice</li>
        <li onClick={() => onSelect('templates')} className={`p-4 cursor-pointer ${selected === 'templates' ? 'bg-gray-700' : ''}`}>Sample Project Templates</li>
      </ul>
    </div>
  );
};

export default Sidebar;
