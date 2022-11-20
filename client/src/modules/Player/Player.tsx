import React from "react";
import Sprite from "../../components/Sprite";
import useTexture from "../../hooks/useTexture";

const Player = () => {
  const { getTexture } = useTexture();

  return (
    <Sprite
      spriteKey="player"
      texture={getTexture("player")}
      horizontalFrames={4}
      verticalFrames={4}
      scale={[1, 1.5, 0]}
    />
  );
};

export default Player;
