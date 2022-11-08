import { Socket } from "socket.io";

class Player {
  public id: string;
  public socket: Socket;
  public position: { x: number; y: number } = { x: 0, y: 0 };
  public direction = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  public faceDirection = "down";

  private time = 0;

  constructor(socket: Socket) {
    this.socket = socket;
    this.id = socket.id;

    this.onPlayerStartMove();
    this.onPlayerStopMove();
  }

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

  public updateSelfPosition = () => {
    const oldPosition = `${this.position.x},${this.position.y}`;

    if (this.direction.up) this.position.y += 1;
    else if (this.direction.down) this.position.y -= 1;
    else if (this.direction.left) this.position.x -= 1;
    else if (this.direction.right) this.position.x += 1;

    const newPosition = `${this.position.x},${this.position.y}`;

    if (oldPosition !== newPosition) {
      this.socket.emit("player:position", {
        position: this.position,
        faceDirection: this.faceDirection,
      });
    }
  };
}

export default Player;
