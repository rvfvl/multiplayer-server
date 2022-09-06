const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  socket.on("ping", (callback: any) => {
    callback();
  });
});

httpServer.listen(5000, () => console.log("listening"));
