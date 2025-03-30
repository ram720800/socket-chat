import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("onlineUsers", Object.keys(userSocketMap));

  //Group Chat
  //join room
  socket.on("joinGroup", (groupId) => {
    if (!groupId) {
      console.log("Invalid groupId received:", groupId);
      return;
    }
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });
  //leave room
  socket.on("leaveGroup", (groupId) => {
    socket.leave(groupId);
    console.log(`User ${socket.id} left group ${groupId}`);
  });

  socket.on("disconnect", () => {
    console.log(`a user disconnected: ${socket.id}`);

    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
