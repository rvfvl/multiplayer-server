import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors, { CorsOptions } from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import GameServer from "./game/services/GameServer";
import authRouter from "./routes/auth";
import mongoose from "mongoose";

const corsObject: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

mongoose
  .connect("mongodb://root:example@mongo:27017/valart?authSource=admin")
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: corsObject,
    });

    app.use(cors(corsObject));
    app.use(express.json());

    app.use("/api/auth", authRouter);

    io.use((socket, next) => {
      const { token } = socket.handshake.auth;
      console.log(token);
      if (token) {
        return next();
      }

      return next(new Error("authentication error"));
    });

    const gameServer = new GameServer(io);
    gameServer.start();

    httpServer.listen(5000, () => console.log("listening"));
  });
