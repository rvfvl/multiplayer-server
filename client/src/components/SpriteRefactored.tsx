import { useLoader } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { NearestFilter, Sprite, SpriteMaterial, TextureLoader } from "three";
import useGame from "../hooks/useGame";

type SpriteProps = {
  assetPath: string;
  horizontalFrames?: number;
  verticalFrames?: number;
};

const SpriteRefactored = ({
  assetPath,
  horizontalFrames = 1,
  verticalFrames = 1,
}: SpriteProps) => {
  const texture = useLoader(TextureLoader, assetPath);
  const spriteRef = useRef<Sprite>(null);
  //const spriteMaterialRef = useRef<SpriteMaterial>(null);
  const { registerComponent, unregisterComponent } = useGame();

  useLayoutEffect(() => {
    const sprite = spriteRef.current;

    if (sprite && sprite.material && sprite.material.map) {
      sprite.material.map.repeat.set(1 / horizontalFrames, 1 / verticalFrames);
      sprite.material.map.offset.set(0, 0);
      sprite.material.map.magFilter = NearestFilter;
    }

    registerComponent(spriteRef.current);

    return () => {
      unregisterComponent(spriteRef.current);
    };
  }, []);

  return (
    <sprite ref={spriteRef}>
      <spriteMaterial map={texture} />
    </sprite>
  );
};

export default SpriteRefactored;
