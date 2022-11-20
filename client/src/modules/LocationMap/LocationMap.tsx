import Sprite from "../../components/Sprite";
import useGameComponent from "../../hooks/useGameComponent";
import useTexture from "../../hooks/useTexture";
import Player from "../Player/Player";

const LocationMap = () => {
  const { getTexture } = useTexture();
  const { gameComponents } = useGameComponent();
  console.log("gameComponents", gameComponents);

  return (
    <>
      <Sprite spriteKey="map" texture={getTexture("map")} scale={[96, 64, 0]} />
      <Player />
    </>
  );
};

export default LocationMap;
