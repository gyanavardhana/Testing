import React, { useState } from "react";
import DiscussionPage from "./DicussionPage";
import CommunityChallengesPage from "./CommunityChallenges";
import PollsPage from "./PollsPage";
import AIEventsPage from "./AIEventsPage";
import Sidebar from "./Sidebar";
import AIProjectsPage from "./AIProjectsPage";
import Resources from "./Resources";
import  NavigationBar from "../Homepage/Navigationbar";

const Community = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('discussions');

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render the appropriate page based on the active tab
  const renderPage = () => {
    switch (activeTab) {
      case 'discussions':
        return <DiscussionPage />;
      case 'community-challenges':
        return <CommunityChallengesPage />;
      case 'polls':
        return <PollsPage />;
      case 'ai-projects':
        return <AIProjectsPage />;
      case 'ai-resources':
        return <Resources />;
      case 'ai-events':
        return <AIEventsPage />;
      default:
        return null;
    }
  };

  return ( 
     <div><NavigationBar/>
    <div className="flex">
    
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-grow">
        {renderPage()}
      </div>
    </div>
    </div>
  );
}

export default Community;
