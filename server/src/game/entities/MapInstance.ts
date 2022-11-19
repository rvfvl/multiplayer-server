import { Socket } from "socket.io";
import { IUser } from "../../models/User";
import { loadMapsData } from "../../utils/maps-loader";
import Player from "./Player";

export type MapData = ReturnType<typeof loadMapsData>[number];

class MapInstance {
  private mapData: MapData;
  private players: Player[] = [];

  constructor(map: MapData) {
    this.mapData = map;
  }

  public getMapData = () => this.mapData;

  public getAllPlayers = () => this.players;

  public getPlayerByUsername = (username: string) =>
    this.players.find((player) => player.getPlayerData().username === username);

  public addPlayer = (socket: Socket, playerData: IUser) => {
    this.players.push(new Player(socket, playerData, this));

    // Sends initial map data to the player.
    socket.emit("map:load", {
      map: this.mapData,
      player: playerData,
    });
  };

  public removePlayer = (username: string) => {
    const player = this.getPlayerByUsername(username);

    if (player) {
      this.players = this.players.filter((p) => p !== player);
      player.off();
    }
  };
}

export default MapInstance;
