import React, { useState, useEffect } from "react";
import axios from "axios";
import { IdeaCardContainer } from "../Homepage/AllProjectIdeas";
import NavigationBar from "../Homepage/Navigationbar";

function ProjectIdeasList() {
  const [projectIdeas, setProjectIdeas] = useState([]);
  const [groupedProjectIdeas, setGroupedProjectIdeas] = useState({});

  // Flag to track if names have been fetched
  const [namesFetched, setNamesFetched] = useState(false);

  useEffect(() => {
    const fetchProjectIdeas = async () => {
      try {
        const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}everyprojectidea`
        );
        setProjectIdeas(response.data);
      } catch (error) {
        console.error("Error fetching project ideas:", error);
      }
    };

    fetchProjectIdeas();
  }, []);

  useEffect(() => {
    const groupProjectIdeasByMemberOrOrganization = () => {
      const groupedIdeas = {};
    
      projectIdeas.forEach((idea) => {
        const associatedId = idea.memberId || idea.organizationId;
        if (!groupedIdeas[associatedId]) {
          groupedIdeas[associatedId] = {
            name: "", // Placeholder for the name
            projectIdeas: [],
          };
        }
        groupedIdeas[associatedId].projectIdeas.push(idea);
      });
    
      console.log("Grouped Ideas:", groupedIdeas); // Log groupedIdeas
    
      setGroupedProjectIdeas(groupedIdeas);
    };
    

    groupProjectIdeasByMemberOrOrganization();
  }, [projectIdeas]);

  // Fetch names only once after project ideas and groupedProjectIdeas are populated
  useEffect(() => {
    
    const fetchNames = async () => {
      if (!namesFetched && Object.keys(groupedProjectIdeas).length > 0) {
        const ids = Object.keys(groupedProjectIdeas);
        console.log("Grouped Project Ideas:", groupedProjectIdeas); // Log groupedProjectIdeas
        const fetchedIds = new Set(); // Use a set to keep track of fetched IDs
        const promises = ids.map(async (id) => {
          let name;
          try {
            if (!fetchedIds.has(id)) {
              fetchedIds.add(id);
              console.log(groupedProjectIdeas[id]);
              const associatedProjectIdeas = groupedProjectIdeas[id].projectIdeas;
              // Loop through associated project ideas to find memberId or organizationId
              for (let i = 0; i < associatedProjectIdeas.length; i++) {
                const projectIdea = associatedProjectIdeas[i];
                if (projectIdea.memberId) {
                  console.log("Member ID:", id); // Log member ID
                  const response = await axios.get(
                    `${import.meta.env.VITE_APP_URL}mem/getmemberinfo/${id}`
                  );
                  console.log("Member Info Response:", response.data); // Log member info response
                  name = `${response.data.name}'s Project Ideas`;
                  break; // Exit loop once memberId is found
                } else {
                  const response = await axios.get(
                    `${import.meta.env.VITE_APP_URL}org/getorganizationinfo/${id}`
                  );
                  name = `${response.data.name}'s Organization Project Ideas`;
                  break; // Exit loop once organizationId is found
                }
              }
            }
          } catch (error) {
            console.error("Error fetching name for id:", id, error);
            name = "Name Unavailable"; // Set a default name
          }
          return { id, name };
        });
    
        Promise.all(promises)
          .then((nameResults) => {
            const updatedGroupedProjectIdeas = {};
            nameResults.forEach(({ id, name }) => {
              updatedGroupedProjectIdeas[id] = {
                ...groupedProjectIdeas[id],
                name: name,
              };
            });
            setGroupedProjectIdeas(updatedGroupedProjectIdeas);
            setNamesFetched(true); // Set flag after names are fetched
          })
          .catch((error) => {
            console.error("Error fetching names:", error);
          });
      }
    };
    
    
    

    fetchNames();
  }, [projectIdeas, groupedProjectIdeas]); // Only re-run when projectIdeas or groupedProjectIdeas change

  return (
    <div>
      <NavigationBar />
      <div>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mt-8 mb-4">Project Ideas</h2>
        {Object.values(groupedProjectIdeas).map((group, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mt-4 mb-2">{group.name}</h3>
            <IdeaCardContainer cards={group.projectIdeas} />
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
  
}

export default ProjectIdeasList;
