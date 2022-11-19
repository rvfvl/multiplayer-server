import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import express from "express";
import cors, { CorsOptions } from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import GameServer from "./game/services/GameServer";
import authRouter from "./routes/auth";
import connectDb from "./utils/connectDb";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import logger from "./utils/logger";

const corsObject: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsObject,
});

app.use(cors(corsObject));
app.use(express.json());

app.use("/api/auth", authRouter);

io.use((socket, next) => {
  try {
    const { token } = socket.handshake.auth;
    const accessToken = token.split(" ")[1];
    const user = jwt.verify(accessToken, process.env.JWT_SECRET!);

    if (user) {
      // @ts-ignore
      socket.data = user;
      return next();
    }
  } catch (error) {
    return next(new Error(error as string));
  }
});

mongoose.connection.once("open", () => {
  logger.info("MongoDB database connection established successfully");
  const gameServer = new GameServer(io);
  gameServer.start();
  httpServer.listen(5000, () => logger.info("Server is running on port 5000"));
});
