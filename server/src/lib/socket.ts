import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
dotenv.config();

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN_URL as string],
  },
});

export const getReceiverSocketId = (userId: string) => {
  return userSocketMap[userId];
};

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId as string] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    delete userSocketMap[userId as string];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
