import { Server, Socket } from "socket.io";
import { IUser } from "../../models/User";
import logger from "../../utils/logger";
import Player from "../entities/Player";
import MapManager from "./MapManager";

class GameManager {
  private mapManager = new MapManager();

  public allocateNewPlayerConnection = (socket: Socket, playerData: IUser) => {
    const oldConnection = this.getPlayerByUsername(playerData.username);
    const mapInstance = this.mapManager.getMapByName(playerData.location);

    if (!mapInstance) {
      logger.error(`Unable to find map ${playerData.location}`);
      return;
    }

    // If the player is already connected, remove the old connection
    if (oldConnection) {
      oldConnection.getSocket().disconnect(true);
      mapInstance.removePlayer(oldConnection.getPlayerData().username);
    }

    mapInstance.addPlayer(socket, playerData);
  };

  public cleanupPlayerConnection = (username: string) => {
    const player = this.getPlayerByUsername(username);

    if (!player) {
      logger.error(`Unable to find player ${username}`);
      return;
    }

    player.destroy();
  };

  // public emitPlayerPositions = () => {
  //   for (const player of this.players) {
  //     player.updateSelfPosition();
  //   }
  // };

  private getPlayerByUsername = (username: string) => {
    const maps = this.mapManager.getAllMaps();

    for (const map of maps) {
      const player = map.getPlayerByUsername(username);

      if (player) {
        return player;
      }
    }
  };
}

export default GameManager;
