import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketServer } from "../types/socket";
import GameServer from "./services/GameServer";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// io.use((socket, next) => {
//   const { token } = socket.handshake.auth;
//   console.log(token);
//   if (token) {
//     return next();
//   }

//   return next(new Error("authentication error"));
// });

const gameServer = new GameServer(io);
gameServer.start();

httpServer.listen(5000, () => console.log("listening"));
