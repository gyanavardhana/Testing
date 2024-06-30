import React from 'react';

const StaticContent = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Latest Blog Posts</h3>
            <p className="text-gray-700">
              Check out our latest blog posts for insightful articles on technology trends and industry updates.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Social Media</h3>
            <p className="text-gray-700">
              Connect with us on social media to stay updated with our community events and activities.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Newsletter</h3>
            <p className="text-gray-700">
              Join our newsletter to receive exclusive offers, updates, and tips directly to your inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticContent;
