import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import AssetsLoader from "./AssetsLoader";

type GameProps = {
  children: React.ReactNode;
};

export const GameContext = React.createContext({
  componentRegistry: [],
  registerComponent: (component: any) => {},
  unregisterComponent: (component: any) => {},
});

const Game = ({ children }: GameProps) => {
  const [componentRegistry, setComponentRegistry] = useState([]);
  const [currentMap, setCurrentMap] = useState("city");

  const registerComponent = (component: any) => {
    // @ts-ignore
    setComponentRegistry((prev) => [...prev, component]);
  };

  const unregisterComponent = (component: any) => {
    setComponentRegistry((prev) => prev.filter((c) => c !== component));
  };
  console.log("componentRegistry", componentRegistry);

  return (
    <GameContext.Provider
      value={{
        componentRegistry,
        registerComponent,
        unregisterComponent,
      }}
    >
      <Canvas orthographic camera={{ zoom: 64, position: [0, 0, 32] }}>
        <AssetsLoader
          assets={{
            player: "./player.png",
            logo: "./logo512.png",
          }}
        >
          <ambientLight />
          {children}
        </AssetsLoader>
      </Canvas>
    </GameContext.Provider>
  );
};

export default Game;
