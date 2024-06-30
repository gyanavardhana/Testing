import React from 'react';

const SampleProjectTemplate = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Project Templates</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* To-Do List Application */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">To-Do List Application</h2>
          <p className="mb-4">
            <strong>Description:</strong> A simple to-do list application where users can add, edit, and delete tasks.
          </p>
          <p className="mb-4">
            <strong>Technologies Used:</strong> React (Frontend), CSS (Styling)
          </p>
          <p className="mb-4">
            <strong>Skills Required:</strong> React.js, State management, Event handling
          </p>
          <p>
            <strong>Weightage of Project:</strong> Beginner level, Suitable for learning React fundamentals, Can be expanded with features like task completion, task categories, and more advanced UI/UX design.
          </p>
        </div>

        {/* Weather App */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Weather App</h2>
          <p className="mb-4">
            <strong>Description:</strong> A weather application that displays the current weather conditions, forecast, and temperature for a specified location.
          </p>
          <p className="mb-4">
            <strong>Technologies Used:</strong> React (Frontend), CSS (Styling), OpenWeatherMap API (Weather data)
          </p>
          <p className="mb-4">
            <strong>Skills Required:</strong> React.js, Fetching data from APIs, Basic understanding of asynchronous JavaScript (Promises)
          </p>
          <p>
            <strong>Weightage of Project:</strong> Intermediate level, Requires API integration and data fetching, Offers opportunities for learning about handling asynchronous operations in React
          </p>
        </div>
      </div>
    </div>
  );
};

export default SampleProjectTemplate;
