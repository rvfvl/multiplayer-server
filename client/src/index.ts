import { io } from "socket.io-client";

const socket = io("localhost:5000");

setInterval(() => {
  const start = Date.now();

  socket.emit("ping", () => {
    const duration = Date.now() - start;
    console.log(duration + "ms");
  });
}, 1000);
