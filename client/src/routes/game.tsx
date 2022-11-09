import { useLoaderData } from "react-router-dom";
import Game from "../components/Game";
import Player from "../components/Player";
import useWindowResize from "../hooks/useWindowResize";
import Map from "../components/Map";
import Sprite from "../components/Sprite";

const GameWindow = () => {
  const { height, width } = useWindowResize();
  const data = useLoaderData();

  console.log("DATA", data);

  return (
    <div style={{ width, height }}>
      <Game>
        <Map />
        {/* <Player /> */}
        <Sprite
          assetPath=""
          horizontalFrames={6}
          verticalFrames={6}
          frameIndex={6}
        />
        <Sprite
          assetPath=""
          horizontalFrames={6}
          verticalFrames={6}
          frameIndex={4}
        />
      </Game>
    </div>
  );
};

export default GameWindow;
