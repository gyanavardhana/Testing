require('dotenv').config();
const express = require('express');
const db = require('./db/dbconnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require("socket.io");
const { PeerServer } = require('peer');
const promClient = require('prom-client');
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'https://testing-three-ruddy-82.vercel.app/',
  'https://backend-87mwl98b.b4a.run/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());


const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Adjust SameSite attribute
  path: '/', // Ensure cookies are accessible site-wide
};

// Example of setting a cookie
app.use((req, res, next) => {
  res.cookie('exampleCookie', 'cookieValue', cookieOptions);
  next();
});


const io = new Server(server, {
  cors: corsOptions
});

// Prometheus metrics
const promRegistry = new promClient.Registry();
promClient.collectDefaultMetrics({ register: promRegistry });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['route', 'method'],
  registers: [promRegistry]
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'method', 'status'],
  registers: [promRegistry]
});

// Middleware to track HTTP request duration and count
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  const route = req.originalUrl || req.url; // Use originalUrl or url to get the route
  res.on('finish', () => {
    end({ route: route, method: req.method });
    httpRequestTotal.labels(route, req.method, res.statusCode).inc();
  });
  next();
});

// Import your routes here
const memberroutes = require('./routes/memberroutes');
const organizationroutes = require('./routes/organizationroutes');
const projectroutes = require('./routes/project');
const messageroutes = require('./routes/messageroutes');
const AiRoutes = require('./routes/Airoutes');
const roomroutes = require('./Videochat/video');

// Use your routes
app.use(memberroutes);
app.use(organizationroutes);
app.use(projectroutes);
app.use(messageroutes);
app.use(AiRoutes);
app.use(roomroutes);

// Mapping of user ID to socket ID
const onlineUsers = {};

io.on('connection', (socket) => {
  console.log('New User Logged In with ID ' + socket.id);

  // Handle user authentication
  const userId = socket.handshake.auth.userId;
  onlineUsers[userId] = socket.id;
  console.log(`User ${userId} authenticated with socket ID ${socket.id}`);

  // Handle chat messages
  socket.on('sendMessage', (data) => {
    // Emit the message to the sender for display
    socket.emit('message', data);

    // Find the recipient's socket and emit the message to them if they are online
    const recipientUserId = data.receiverUserId;
    const recipientSocketId = onlineUsers[recipientUserId];
    console.log(`Recipient Socket ID: ${recipientSocketId}`);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('message', data);
    } else {
      // Handle the case where the recipient is not online
      console.log(`User ${recipientUserId} is not online.`);
      // Optionally, you could store the message in a database for offline users
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const userId = getKeyByValue(onlineUsers, socket.id);
    if (userId) {
      delete onlineUsers[userId];
      console.log(`Socket ID ${socket.id} disconnected for user ${userId}`);
    }
    console.log('User disconnected with ID ' + socket.id);
  });

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect-video', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

// Utility function to get key by value from an object
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

app.get('/onlineUsers', (req, res) => {
  res.json(onlineUsers);
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promRegistry.contentType);
    res.end(await promRegistry.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

const peerServer = PeerServer({ port: 3001 }, () => {
  console.log('PeerJS server is running on port 3001');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
