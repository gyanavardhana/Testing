import React from 'react';

const MemberBenefits = () => {
  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Member Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Access to Projects</h3>
          <p>Opportunity to participate in various projects across different domains.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
          <p>Enhance your skills by working on real-world projects and collaborating with professionals.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Networking</h3>
          <p>Connect with like-minded individuals and expand your professional network.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Learning Opportunities</h3>
          <p>Access to resources, workshops, and training sessions to further your knowledge.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recognition</h3>
          <p>Recognition for your contributions to projects and the community.</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
          <p>Potential career advancement opportunities through project experience and networking.</p>
        </div>
      </div>
    </div>
  );
};

export default MemberBenefits;
