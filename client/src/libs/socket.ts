import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  "map:load": (d: { map: any; player: any }) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000",
  {
    autoConnect: false,
    auth: {
      token: `Bearer ${localStorage.getItem("accessToken")}` ?? "",
    },
  }
);
