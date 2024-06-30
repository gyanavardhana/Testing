import React, { useEffect, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const videoGridRef = useRef(null);
  const peersRef = useRef({});

  useEffect(() => {
    const socket = io(import.meta.env.VITE_APP_URL); // Update this URL to match your server
    const myPeer = new Peer(undefined, {
      host: import.meta.env.VITE_APP_DOMAIN,
      port: "3001",

    });
    const myVideo = document.createElement("video");
    myVideo.muted = true;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);

        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      });

    socket.on("user-disconnected", (userId) => {
      if (peersRef.current[userId]) peersRef.current[userId].close();
    });

    myPeer.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on("close", () => {
        video.remove();
      });

      peersRef.current[userId] = call;
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGridRef.current.append(video);
    }

    return () => {
      socket.disconnect();
      myPeer.destroy();
    };
  }, [roomId]);

  return (
    <div
      id="video-grid"
      ref={videoGridRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        gridAutoRows: "300px",
      }}
    ></div>
  );
};

export default Room;
