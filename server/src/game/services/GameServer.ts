import { Server } from "socket.io";
import GameManager from "./GameManager";

class GameServer {
  private gameManager: GameManager;
  private io: Server;

  constructor(io: Server) {
    this.gameManager = new GameManager(io);
    this.io = io;

    this.onPlayerConnect();
  }

  private onPlayerConnect = () => {
    this.io.on("connection", (socket) => {
      this.gameManager.addPlayer(socket);
      console.log("a user connected", socket.id);

      socket.on("disconnect", () => {
        this.gameManager.removePlayer(socket.id);
        console.log("user disconnected", socket.id);
      });
    });
  };

  private Update = () => {
    this.gameManager.updatePlayerPositions();
  };

  public start = () => {
    setInterval(() => {
      this.Update();
    }, 1000 / 3);
  };
}

export default GameServer;
