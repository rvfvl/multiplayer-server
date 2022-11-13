import { Server, Socket } from "socket.io";
import User from "../../models/User";
import logger from "../../utils/logger";
import GameManager from "./GameManager";

class GameServer {
  private gameManager: GameManager;
  private io: Server;
  private gameIntervalId: NodeJS.Timeout | null = null;

  constructor(io: Server) {
    this.gameManager = new GameManager();
    this.io = io;
  }

  public start = async () => {
    try {
      this.onPlayerConnect();

      if (this.gameIntervalId) {
        clearInterval(this.gameIntervalId);
      }

      this.gameIntervalId = setInterval(() => {
        this.Update();
      }, 3000);
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
    }
  };

  private onPlayerConnect = () => {
    this.io.on("connection", async (socket) => {
      logger.info("Player connected", {
        username: socket.data.username,
        id: socket.id,
      });

      const playerData = await this.getConnectedPlayerData(
        socket.data.username
      );

      if (!playerData) {
        logger.error(`Player data not found for ${socket.data.username}`);
        socket.disconnect(true);
        return;
      }

      this.gameManager.allocateNewPlayerConnection(socket, playerData);

      socket.on("disconnect", () => {
        logger.info("Player disconnected", {
          username: socket.data.username,
          id: socket.id,
        });
        this.gameManager.cleanupPlayerConnection(socket.data.username);
      });
    });
  };

  private Update = () => {
    console.log(this.gameManager);
    //this.gameManager.emitPlayerPositions();
  };

  private getConnectedPlayerData = async (username: string) => {
    try {
      const user = (await User.find({ username }).lean()).shift();

      return user;
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
    }
  };
}

export default GameServer;
