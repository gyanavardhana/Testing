import React from 'react';

const AIEventsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Event Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">AI Summit 2024</h2>
          <p className="text-gray-700 mb-4">Join us for the AI Summit 2024, where experts from around the world will gather to discuss the latest advancements in artificial intelligence.</p>
          <p className="text-gray-700">Date: September 15-17, 2024</p>
          <p className="text-gray-700">Location: Virtual Event</p>
        </div>

        {/* AI Event Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">AI Expo 2024</h2>
          <p className="text-gray-700 mb-4">Experience the future of AI at the AI Expo 2024, featuring cutting-edge technologies, keynote presentations, and networking opportunities.</p>
          <p className="text-gray-700">Date: November 10-12, 2024</p>
          <p className="text-gray-700">Location: Convention Center, San Francisco</p>
        </div>

        {/* AI Event Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">AI Conference 2024</h2>
          <p className="text-gray-700 mb-4">Don't miss the AI Conference 2024, where industry leaders will share insights and strategies for leveraging AI in business and technology.</p>
          <p className="text-gray-700">Date: December 5-7, 2024</p>
          <p className="text-gray-700">Location: Hilton Hotel, New York City</p>
        </div>
      </div>
    </div>
  );
};

export default AIEventsPage;
