import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AssetsLoader from "./AssetsLoader";

export const socket = io("http://localhost:5000");

type GameProps = {
  children: React.ReactNode;
};

export const GameContext = React.createContext({
  componentRegistry: [],
  registerComponent: (component: any) => {},
  unregisterComponent: (component: any) => {},
});

const Game = ({ children }: GameProps) => {
  const [establishedSocketConnection, setEstablishedSocketConnection] =
    useState(false);
  const [componentRegistry, setComponentRegistry] = useState([]);
  const [currentMap, setCurrentMap] = useState("city");

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      console.log("connected");
      setEstablishedSocketConnection(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

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
          socketConnectionEstablished={establishedSocketConnection}
        >
          <ambientLight />
          {children}
        </AssetsLoader>
      </Canvas>
    </GameContext.Provider>
  );
};

export default Game;
