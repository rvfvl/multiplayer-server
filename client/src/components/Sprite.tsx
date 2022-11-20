import { useEffect, useLayoutEffect, useMemo } from "react";
import { NearestFilter, RepeatWrapping, Texture as ThreeTexture } from "three";
import { componentsStore } from "../modules/GameLoader/GameLoader";

type SpriteProps = {
  spriteKey: string;
  texture: ThreeTexture;
  horizontalFrames?: number;
  verticalFrames?: number;
  frameIndex?: number;
  scale?: [number, number, number];
};

const Sprite = ({
  spriteKey,
  texture,
  horizontalFrames = 1,
  verticalFrames = 1,
  frameIndex = 0,
  scale,
}: SpriteProps) => {
  const clone = useMemo(() => {
    console.log("cloning!!!");
    return texture.clone();
  }, [texture]);

  useLayoutEffect(() => {
    clone.minFilter = NearestFilter;
    clone.magFilter = NearestFilter;
    clone.wrapS = RepeatWrapping;
    clone.wrapT = RepeatWrapping;

    clone.repeat.set(1 / horizontalFrames, 1 / verticalFrames);
    clone.offset.set(
      (frameIndex % horizontalFrames) / horizontalFrames,
      (verticalFrames - Math.floor(frameIndex / horizontalFrames) - 1) /
        verticalFrames
    );
  }, []);

  useEffect(() => {
    componentsStore.setState((prev) => [
      ...prev,
      { name: spriteKey, component: clone },
    ]);

    return () => {
      componentsStore.setState((prev) =>
        prev.filter((c) => c.name !== spriteKey)
      );
    };
  }, []);

  return (
    <sprite scale={scale}>
      <spriteMaterial map={clone} />
    </sprite>
  );
};

export default Sprite;
