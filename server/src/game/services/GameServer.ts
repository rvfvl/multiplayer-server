import { Server } from "socket.io";
import logger from "../../libs/logger";
import GameManager from "./GameManager";
import Loader from "./Loader";

class GameServer {
  private gameManager: GameManager;
  private io: Server;

  constructor(io: Server) {
    Loader.loadGameObjects();
    this.gameManager = new GameManager();
    this.io = io;
  }

  private onPlayerConnect = () => {
    this.io.on("connection", (socket) => {
      logger.info("Player connected", {
        username: socket.data.username,
        id: socket.id,
      });
      this.gameManager.addPlayer(socket);

      socket.on("disconnect", () => {
        logger.info("Player disconnected", {
          username: socket.data.username,
          id: socket.id,
        });
        this.gameManager.removePlayer(socket.id);
      });
    });
  };

  private Update = () => {
    this.gameManager.updatePlayerPositions();
  };

  public start = async () => {
    try {
      this.onPlayerConnect();

      setInterval(() => {
        this.Update();
      }, 1000 / 3);
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
    }
  };
}

export default GameServer;
