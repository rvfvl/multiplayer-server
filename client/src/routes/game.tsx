import { useLoaderData } from "react-router-dom";

import Player from "../components/Player";
import useWindowResize from "../hooks/useWindowResize";
import Sprite from "../components/Sprite";
import { GameLoader } from "../modules/GameLoader/GameLoader";
import LocationMap from "../modules/LocationMap/LocationMap";

const GameWindow = () => {
  const { height, width } = useWindowResize();

  return (
    <div style={{ width, height, position: "relative" }}>
      {/* <Game>
        <Map />
        <Player />
        <Sprite
          assetPath=""
          horizontalFrames={6}
          verticalFrames={6}
          frameIndex={6}
        />
      </Game>
      <div style={{ position: "absolute", background: "red", top: 0, left: 0 }}>
        Test
      </div> */}
      <GameLoader>
        <LocationMap />
        {/* HUD */}
      </GameLoader>
    </div>
  );
};

export default GameWindow;
