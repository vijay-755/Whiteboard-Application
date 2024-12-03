const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketHandlers = require("./socket/handlers");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
    res.send("Collaborative Whiteboard Backend is running!");
});~~

// WebSocket connection
io.on("connection", (socket) => {
    socketHandlers.handleConnection(socket, io);
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
