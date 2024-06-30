import React from 'react';

const TechnologyCard = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center">
      <img src={imageUrl} alt={name} className="w-16 h-16 mr-4" />
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default TechnologyCard;
