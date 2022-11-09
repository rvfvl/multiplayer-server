import { Socket } from "socket.io";

interface ServerToClientEvents {
  //   noArg: () => void;
  //   basicEmit: (a: number, b: string, c: Buffer) => void;
  //   withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  "player:startMove": (direction: string) => void;
}

export type SocketServer = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  {}
>;
