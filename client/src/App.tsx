import Game from "./components/Game";
import Player from "./components/Player";
import Map from "./components/Map";
import AssetsLoader from "./components/AssetsLoader";
import useWindowResize from "./hooks/useWindowResize";

function App() {
  const { height, width } = useWindowResize();

  return (
    <div style={{ width, height }}>
      <Game>
        <Map />
        <Player />
      </Game>
    </div>
  );
}

export default App;
