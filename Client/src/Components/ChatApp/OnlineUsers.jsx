import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function OnlineUsers({ userId }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
        transports: ["websocket", "polling", "flashsocket"],
        auth: {
          userId: userId,
        }
        });

    socket.on("connect", () => {
      console.log("Connected to server!");
    });

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Online Users</h2>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
