import { Server, Socket } from "socket.io";
import Player from "../entities/Player";

class GameManager {
  public players: Player[] = [];
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public addPlayer = (socket: Socket) => {
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
