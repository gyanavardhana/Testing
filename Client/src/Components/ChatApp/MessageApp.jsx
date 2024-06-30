import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

function MessageApp() {
  axios.defaults.withCredentials = true; // Send cookies with every request
  const { organizationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(""); // State to store user ID obtained from backend
  const [socket, setSocket] = useState(null); // State to store socket instance

  useEffect(() => {
    // Fetch user ID from backend upon component mount
    const userToChatId = organizationId;

    // Fetch messages based on sender, receiver, and timestamp
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}mes/${userToChatId}`);
        setMessages(response.data); // Set fetched messages to state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch user ID and connect socket
    const fetchUserIdAndConnectSocket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}userId`, {
          withCredentials: true // Send cookies with the request
        });
        setUserId(response.data.userId);

        // Establish socket connection after setting userId
        const newSocket = io(`${import.meta.env.VITE_APP_URL}`, {
          transports: ["websocket", "polling", "flashsocket"],
          auth: {
            userId: response.data.userId
          }
        });

        newSocket.on("connect", () => {
          console.log("Connected to server!");
          // Perform actions based on connection establishment
        });

        newSocket.on("message", (message) => {
          console.log("1")
          // Update state with new message
          setMessages(prevMessages => [...prevMessages, message]);
          console.log("2")
        });

        setSocket(newSocket); // Set the socket instance in state

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    // Fetch user ID and connect socket
    fetchUserIdAndConnectSocket();

    // Fetch messages
    fetchMessages();
  }, [organizationId]); // Reconnect socket and fetch messages when organizationId changes

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage && organizationId && userId && socket) { // Ensure socket is not null
      try {
        const data = {
          message: newMessage
        };
        await axios.post(
          `${import.meta.env.VITE_APP_URL}send/${organizationId}`,
          data
        );

        socket.emit("sendMessage", { message: newMessage, senderId: userId, receiverUserId: organizationId });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800">Message App</h1>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 bg-white rounded-lg shadow-md">
          <div className="px-8 py-8">
            <h2 className="text-3xl font-bold mb-4">Chat</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-md ${
                      message.senderId === organizationId
                        ? "bg-blue-100 text-left"
                        : "bg-gray-100 text-right"
                    }`}
                  >
                    <p className="text-xs text-gray-500">{}</p>
                    <p>{message.message}</p>
                    <p className="text-xs text-gray-500">{message.createdAt}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enter message..."
                  className="border border-gray-300 rounded-md py-2 px-4 flex-1 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MessageApp;
