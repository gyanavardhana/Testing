import React from 'react';

const PollsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Polls</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Poll Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Favorite Programming Language</h2>
          <p className="text-gray-700 mb-4">What is your favorite programming language?</p>
          <ul className="list-disc pl-6">
            <li>JavaScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>C++</li>
            <li>Other</li>
          </ul>
        </div>

        {/* Poll Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Best Framework for Web Development</h2>
          <p className="text-gray-700 mb-4">Which framework do you prefer for web development?</p>
          <ul className="list-disc pl-6">
            <li>React</li>
            <li>Angular</li>
            <li>Vue.js</li>
            <li>Express.js</li>
            <li>Other</li>
          </ul>
        </div>

        {/* Poll Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Favorite Tech Company</h2>
          <p className="text-gray-700 mb-4">Which tech company do you admire the most?</p>
          <ul className="list-disc pl-6">
            <li>Google</li>
            <li>Apple</li>
            <li>Microsoft</li>
            <li>Amazon</li>
            <li>Other</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PollsPage;
