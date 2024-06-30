import React from 'react';

const CommunityChallengesPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Challenges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Challenge Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">30-Day Coding Challenge</h2>
          <p className="text-gray-700 mb-4">Join our community challenge to improve your coding skills over 30 days!</p>
          <ul className="list-disc pl-6">
            <li>Duration: 30 days</li>
            <li>Skills: Programming, Problem Solving</li>
            <li>Level: Beginner to Intermediate</li>
            <li>Rewards: Certificates, Recognition</li>
          </ul>
        </div>

        {/* Challenge Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Design Challenge</h2>
          <p className="text-gray-700 mb-4">Participate in our design challenge and showcase your creativity!</p>
          <ul className="list-disc pl-6">
            <li>Theme: User Interface Design</li>
            <li>Duration: 2 weeks</li>
            <li>Tools: Figma, Adobe XD, Sketch</li>
            <li>Rewards: Recognition, Exposure</li>
          </ul>
        </div>

        {/* Challenge Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Fitness Challenge</h2>
          <p className="text-gray-700 mb-4">Get fit and stay healthy with our community fitness challenge!</p>
          <ul className="list-disc pl-6">
            <li>Activities: Running, Yoga, Strength Training</li>
            <li>Duration: 1 month</li>
            <li>Support: Fitness Tips, Group Workouts</li>
            <li>Rewards: Improved Health, Accountability</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityChallengesPage;
