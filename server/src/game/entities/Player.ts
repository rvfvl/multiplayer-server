import { Socket } from "socket.io";
import { IUser } from "../../models/User";
import MapInstance from "./MapInstance";

class Player {
  private playerData: IUser;
  private socket: Socket;

  private direction = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  private faceDirection = "down";
  private parentMapInstance: MapInstance;

  constructor(
    socket: Socket,
    playerData: IUser,
    parentMapInstance: MapInstance
  ) {
    socket.join(parentMapInstance.getMapData().name);
    this.socket = socket;
    this.playerData = playerData;
    this.parentMapInstance = parentMapInstance;

    this.onPlayerStartMove();
    this.onPlayerStopMove();
  }

  public getPlayerData = () => this.playerData;

  public getSocket = () => this.socket;

  public getDirection = () => this.direction;

  public getFaceDirection = () => this.faceDirection;

  public destroy = () => {
    this.parentMapInstance.removePlayer(this.playerData.username);
    this.off();
  };

  public off = () => {
    this.socket.leave(this.parentMapInstance.getMapData().name);
    // TODO: Remove socket listeners
  };

  public onPlayerStartMove = () => {
    this.socket.on(
      "player:startMove",
      ({ direction }: { direction: string }) => {
        switch (direction) {
          case "up":
            this.direction.up = true;
            break;
          case "down":
            this.direction.down = true;
            break;
          case "left":
            this.direction.left = true;
            break;
          case "right":
            this.direction.right = true;
            break;
          default:
            break;
        }

        this.faceDirection = direction;
      }
    );
  };

  public onPlayerStopMove = () => {
    this.socket.on(
      "player:stopMove",
      ({ direction }: { direction: string }) => {
        this.direction[direction as keyof typeof this.direction] = false;
      }
    );
  };

  // public updateSelfPosition = () => {
  //   const oldPosition = `${this.position.x},${this.position.y}`;

  //   if (this.direction.up) this.position.y += 1;
  //   else if (this.direction.down) this.position.y -= 1;
  //   else if (this.direction.left) this.position.x -= 1;
  //   else if (this.direction.right) this.position.x += 1;

  //   const newPosition = `${this.position.x},${this.position.y}`;

  //   if (oldPosition !== newPosition) {
  //     this.socket.emit("player:position", {
  //       position: this.position,
  //       faceDirection: this.faceDirection,
  //     });
  //   }
  // };
}

export default Player;
