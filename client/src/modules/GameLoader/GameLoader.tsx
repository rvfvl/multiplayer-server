import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { socket } from "../../libs/socket";
import createStore from "../../libs/store";
import { AssetsLoader } from "../AssetsLoader/AssetsLoader";

type GameLoaderProps = {
  children: React.ReactNode;
};

export const useGameStore = createStore({ test: 1 });

export const GameLoader = ({ children }: GameLoaderProps) => {
  const [isSocketConnectionEstablished, setisSocketConnectionEstablished] =
    useState(false);
  const [state, setState] = useGameStore();

  useEffect(() => {
    socket.connect();

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      console.log("connected");
      setisSocketConnectionEstablished(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setisSocketConnectionEstablished(false);
    });

    socket.on("map:load", (d) => {
      setState({ test: 2 });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <Canvas orthographic camera={{ zoom: 32, position: [0, 0, 32] }}>
        <ambientLight intensity={1} />
        <AssetsLoader
          isSocketConnectionEstablished={isSocketConnectionEstablished}
          assets={{ map: "./assets/ruiny-szabrownikow.png" }}
        >
          {children}
        </AssetsLoader>
      </Canvas>
      <button onClick={() => setState({ ...state, test: state.test + 1 })}>
        SIEMA
      </button>
    </>
  );
};
