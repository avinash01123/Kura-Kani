const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

//used to store online users in format {userId: socketId}
const userSocketMap = {};

//listen incoming connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.auth.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all the connected clients
  //socket.emit() is used just for just that one socket client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //listen for disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { server, io, app, getReceiverSocketId };
