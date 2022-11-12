import { Server, Socket } from "socket.io";
import { IUser } from "../../models/User";
import Player from "../entities/Player";
import MapManager from "./MapManager";

class GameManager {
  private players: Player[] = [];
  private mapManager = new MapManager();

  public addPlayer = (socket: Socket, playerData: IUser) => {
    const oldConnection = this.players.find(
      (player) => player.socket.data.username === socket.data.username
    );

    // If the player is already connected, remove the old connection
    if (oldConnection) {
      oldConnection.socket.disconnect(true);
      this.removePlayer(oldConnection.id);
    }

    this.players.push(new Player(socket));
  };

  public removePlayer = (id: string) => {
    this.players = this.players.filter((player) => player.id !== id);
  };

  public updatePlayerPositions = () => {
    for (const player of this.players) {
      player.updateSelfPosition();
    }
  };

}

export default GameManager;
