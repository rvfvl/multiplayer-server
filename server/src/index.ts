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

const gameServer = new GameServer(io);
gameServer.start();

httpServer.listen(5000, () => console.log("listening"));
