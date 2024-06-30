var Server = require("socket.io").Server;
var http = require("http");
var express = require("express");

var app = express();

var server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: [
      "https://testing-bay-iota.vercel.app/",
      "https://backendforcolab-hzk11wg6.b4a.run/"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }
});

var getReceiverSocketId = function(receiverId) {
  return userSocketMap[receiverId];
};

var userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  socket.on('sendMessage', (message) => {
    io.emit('newMessage', message); // Broadcast message to all clients
  });
});
io.listen(5000);
module.exports = {
  app: app,
  io: io,
  server: server,
  getReceiverSocketId: getReceiverSocketId
};