import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import GameServer from "./game/services/GameServer";
import authRouter from "./routes/auth";

const corsObject = {
  origin: "http://localhost:3000",
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsObject,
});

app.use(cors(corsObject));
app.use(express.json());

app.use("/api/auth", authRouter);

// io.use((socket, next) => {
//   const { token } = socket.handshake.auth;
//   console.log(token);
//   if (token) {
//     return next();
//   }

//   return next(new Error("authentication error"));
// });

console.log("test");

const gameServer = new GameServer(io);
gameServer.start();

httpServer.listen(5000, () => console.log("listening"));
