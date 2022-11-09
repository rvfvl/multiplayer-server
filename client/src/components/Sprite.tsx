import { useLoader } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { NearestFilter, Sprite as THREESprite, TextureLoader } from "three";
import useAsset from "../hooks/useAsset";
import useGame from "../hooks/useGame";

type SpriteProps = {
  assetPath: string;
  horizontalFrames?: number;
  verticalFrames?: number;
  frameIndex?: number;
};

const Sprite = ({
  assetPath,
  horizontalFrames = 1,
  verticalFrames = 1,
  frameIndex = 0,
}: SpriteProps) => {
  const assets = useAsset();

  console.log("textures", assets);
  //@ts-ignore
  const clone = useMemo(() => assets.back.clone(), [assets.back]);
  const spriteRef = useRef<THREESprite>(null);
  const { registerComponent, unregisterComponent } = useGame();

  useLayoutEffect(() => {
    const sprite = spriteRef.current;

    if (sprite && sprite.material && sprite.material.map) {
      sprite.material.map.repeat.set(1 / horizontalFrames, 1 / verticalFrames);

      sprite.material.map.offset.set(
        (frameIndex % horizontalFrames) / horizontalFrames,
        (verticalFrames - Math.floor(frameIndex / horizontalFrames) - 1) /
          verticalFrames
      );

      sprite.material.map.magFilter = NearestFilter;
    }

    registerComponent(sprite);

    return () => {
      unregisterComponent(sprite);
    };
  }, []);

  return (
    <sprite
      ref={spriteRef}
      dispose={null}
      position={[Math.random() * 10, Math.random() * 10, 0]}
    >
      {/* @ts-ignore */}
      <spriteMaterial map={assets.back} />
    </sprite>
  );
};

export default Sprite;
