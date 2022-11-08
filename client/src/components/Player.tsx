import { useEffect, useRef } from "react";
import useGame from "../hooks/useGame";
import useSocket from "../hooks/useSocket";
import Sprite from "./Sprite";
import anime from "animejs";
import { useFrame } from "@react-three/fiber";

const HORIZONTAL_FRAMES = 3;
const VERTICAL_FRAMES = 4;

const Player = () => {
  const currentFrame = useRef(0);
  const { componentRegistry } = useGame();
  const { emitEvent } = useSocket(
    "player:position",
    ({ position, faceDirection }) => {
      anime({
        // @ts-ignore
        targets: componentRegistry[0].position,
        x: position.x,
        y: position.y,
        duration: 1000 / 3,
        easing: "linear",
        update: (anim) => {
          const frameIndexes = {
            up: [0, 1, 2],
            left: [9, 10, 11],
            down: [6, 7, 8],
            right: [3, 4, 5],
          };

          if (Math.floor(anim.progress) % 14 === 0) {
            currentFrame.current += 1;
          }
          // @ts-ignore
          const frameIndex =
            // @ts-ignore
            frameIndexes[faceDirection][
              anim.progress < 100 ? currentFrame.current % HORIZONTAL_FRAMES : 1
            ];

          // @ts-ignore
          componentRegistry[0].material.map.offset.set(
            (frameIndex % HORIZONTAL_FRAMES) / HORIZONTAL_FRAMES,
            (VERTICAL_FRAMES - Math.floor(frameIndex / HORIZONTAL_FRAMES) - 1) /
              VERTICAL_FRAMES
          );
        },
      });
    }
  );

  useEffect(() => {
    document.addEventListener("keydown", emitPlayerStartMove);
    document.addEventListener("keyup", emitPlayerStopMove);

    return () => {
      document.removeEventListener("keydown", emitPlayerStartMove);
      document.removeEventListener("keyup", emitPlayerStopMove);
    };
  }, []);

  const getDirectionFromKey = (key: string) => {
    let direction: "up" | "down" | "left" | "right" | null = null;

    switch (key) {
      case "ArrowUp":
      case "w":
        direction = "up";
        break;
      case "ArrowDown":
      case "s":
        direction = "down";
        break;
      case "ArrowLeft":
      case "a":
        direction = "left";
        break;
      case "ArrowRight":
      case "d":
        direction = "right";
        break;
      default:
        break;
    }

    return direction;
  };

  const emitPlayerStopMove = (event: KeyboardEvent) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "w" ||
      event.key === "a" ||
      event.key === "s" ||
      event.key === "d"
    ) {
      console.log("stop move");

      const direction = getDirectionFromKey(event.key);

      emitEvent("player:stopMove", { direction });
    }
  };

  const emitPlayerStartMove = (event: KeyboardEvent) => {
    if (event.repeat) return;

    const direction = getDirectionFromKey(event.key);

    if (!direction) return;

    console.log("start move", direction);

    emitEvent("player:startMove", { direction });
  };

  useFrame(({ camera }) => {
    // @ts-ignore
    camera.lookAt(
      // @ts-ignore
      componentRegistry[0].position.x,
      // @ts-ignore
      componentRegistry[0].position.y,
      0
    );
  });

  return (
    <Sprite
      assetPath="./player.png"
      horizontalFrames={HORIZONTAL_FRAMES}
      verticalFrames={VERTICAL_FRAMES}
    />
  );
};

export default Player;
