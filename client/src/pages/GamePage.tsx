import { useLoaderData } from "react-router-dom";
import Game from "../components/Game";
import Player from "../components/Player";
import useWindowResize from "../hooks/useWindowResize";
import Map from "../components/Map";

const GamePage = () => {
  const { height, width } = useWindowResize();
  const data = useLoaderData();

  return (
    <div style={{ width, height }}>
      <Game>
        <Map />
        <Player />
      </Game>
    </div>
  );
};

export default GamePage;
