import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import { useNavigate, useParams } from "react-router-dom";

const Conf = () => {
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();
  const { roomId: routeRoomId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      if (!routeRoomId) {
        // Fetch a new room ID and redirect
        try {
          const response = await axios.get(import.meta.env.VITE_APP_URL);
          navigate(`/room/${response.data.roomId}`);
        } catch (error) {
          console.error("Error fetching room ID:", error);
        }
      } else {
        // Set the room ID from the URL
        console.log(routeRoomId)
        setRoomId(routeRoomId);
      }
    };

    fetchRoom();
  }, [routeRoomId, navigate]);

  if (!roomId) {
    return <div>Loading...</div>;
  }

  return <Room roomId={roomId} />;
};

export default Conf;
