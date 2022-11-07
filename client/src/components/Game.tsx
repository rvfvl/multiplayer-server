import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";

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

  const registerComponent = (component: any) => {
    // @ts-ignore
    setComponentRegistry([...componentRegistry, component]);
  };

  const unregisterComponent = (component: any) => {
    setComponentRegistry(componentRegistry.filter((c) => c !== component));
  };

  return (
    <GameContext.Provider
      value={{
        componentRegistry,
        registerComponent,
        unregisterComponent,
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 64, position: [0, 0, 32], near: 0.1, far: 64 }}
      >
        <ambientLight />
        {children}
      </Canvas>
    </GameContext.Provider>
  );
};

export default Game;
