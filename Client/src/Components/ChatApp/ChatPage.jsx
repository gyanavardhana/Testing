import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";
import "../Homepage/sliding.css";
import NavigationBar from "../Homepage/Navigationbar";

function ChatPage() {
  axios.defaults.withCredentials = true;
  const [organizationSenders, setOrganizationSenders] = useState([]);
  const [memberSenders, setMemberSenders] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchSenderIds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}senderIds`);
        setOrganizationSenders(response.data);
        fetchSenderInfo(response.data);
      } catch (error) {
        navigate("/login");
        console.error("Error fetching sender IDs:", error);
      }
    };

    fetchSenderIds();
  }, []);

  const fetchSenderInfo = async (senderIds) => {
    try {
      const organizationInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}org/getorganizationinfo/${senderId}`
          );
          return { type: "organization", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const memberInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}mem/getmemberinfo/${senderId}`
          );
          return { type: "member", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const organizationResults = await Promise.all(organizationInfoPromises);
      const memberResults = await Promise.all(memberInfoPromises);

      const filteredOrganizationSenders = organizationResults.filter(
        (result) => result !== null
      );
      const filteredMemberSenders = memberResults.filter(
        (result) => result !== null
      );

      setOrganizationSenders(filteredOrganizationSenders);
      setMemberSenders(filteredMemberSenders);
    } catch (error) {
      console.error("Error fetching sender info:", error);
    }
  };

  const handleSelectSender = (senderId) => {
    navigate(`/message-app/${senderId}`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-gray-100">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800">Chat Page</h1>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-12 bg-white rounded-lg shadow-md">
            <div className="px-8 py-8">
              <div className="flex justify-center">
                <div className="w-full sm:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">All Senders</h2>
                  <div>
                    <h3 className="text-lg mb-2">Organization Senders</h3>
                    <List className="overflow-y-auto max-h-72">
                      {organizationSenders.map((sender, index) => (
                        <ListItem
                          key={`org-${index}`}
                          onClick={() => handleSelectSender(sender?.data?._id)}
                          className="cursor-pointer border-b border-gray-300 py-2 flex flex-col relative"
                        >
                          <span className="dot"></span>
                          {/* Display sender info */}
                          <Typography variant="body1" className="text-blue-600 pl-2">
                            {sender?.data?.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 pl-2">
                            {sender?.data?.email}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 mt-4">Member Senders</h3>
                    <List className="overflow-y-auto max-h-72">
                      {memberSenders.map((sender, index) => (
                        <ListItem
                          key={`member-${index}`}
                          onClick={() => handleSelectSender(sender?.data?._id)}
                          className="cursor-pointer border-b border-gray-300 py-2 flex flex-col relative"
                        >
                          <span className="dot"></span>
                          {/* Display sender info */}
                          <Typography variant="body1" className="text-blue-600 pl-2">
                            {sender?.data?.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 pl-2">
                            {sender?.data?.email}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
