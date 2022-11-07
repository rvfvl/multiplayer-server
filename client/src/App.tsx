import Game from "./components/Game";
import Player from "./components/Player";
import useWindowResize from "./hooks/useWindowResize";

function App() {
  const { height, width } = useWindowResize();

  return (
    <div style={{ width, height }}>
      <Game>
        <Player />
      </Game>
    </div>
  );
}

export default App;
