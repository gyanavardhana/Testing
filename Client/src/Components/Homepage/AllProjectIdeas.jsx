import React, { useState, useEffect } from "react";
import axios from 'axios';
import './sliding.css';
import { Navigate, useNavigate } from 'react-router-dom';
import projectidea from '../projectidea.jpg';

const IdeaCard = (props) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const { memberId, organizationId } = props.ideaData;
    if (memberId) {
      navigate(`/message-app/${memberId}`);
    } else {
      navigate(`/message-app/${organizationId}`);
    }
  };

  return (
    <div className="card">
      <img src={projectidea} alt={props.alt || "Image"} /> {/* Use projectidea image */}
      <div className="card-content">
      <h2 className="text-xl font-bold mb-2">{props.title}</h2>
        <p className="mb-2">Description: {props.content}</p>
        <p className="mb-2">Skills required: {props.skills}</p>
        <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect
        </button>
      </div>
    </div>
  );
};

const IdeaCardContainer = (props) => (
  <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {props.cards.map((idea) => (
      <IdeaCard
        key={idea._id}
        title={idea.title}
        content={idea.description}
        skills={idea.skillsRequired.join(", ")}
        ideaData={idea} // Pass the ideaData prop here
      />
    ))}
  </div>
);

const AllProjectsIdeas = () => {
  axios.defaults.withCredentials = true;
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        console.log(<h1>{import.meta.env.VITE_APP_URL}</h1>)
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}everyprojectidea`);
        setIdeas(response.data);
      } catch (error) {
        console.error('Error fetching project ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Project Ideas</h2>
      <div>
        <IdeaCardContainer cards={ideas} />
      </div>
    </div>
  );
};

export  { AllProjectsIdeas, IdeaCardContainer };
