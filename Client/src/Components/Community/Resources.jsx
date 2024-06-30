import React from 'react';

const Resources = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Resource Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">AI Blogs</h2>
          <p className="text-gray-700 mb-4">Explore insightful AI blogs covering topics such as machine learning, deep learning, natural language processing, and more.</p>
          <a href="#" className="text-blue-500 hover:underline">Read More</a>
        </div>

        {/* AI Resource Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Online Courses</h2>
          <p className="text-gray-700 mb-4">Enroll in online courses to learn AI fundamentals, algorithms, and practical applications from top instructors and universities.</p>
          <a href="#" className="text-blue-500 hover:underline">View Courses</a>
        </div>

        {/* AI Resource Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">AI Libraries</h2>
          <p className="text-gray-700 mb-4">Discover powerful AI libraries and frameworks such as TensorFlow, PyTorch, scikit-learn, and more for building AI applications.</p>
          <a href="#" className="text-blue-500 hover:underline">Explore Libraries</a>
        </div>
      </div>
    </div>
  );
};

export default Resources;
