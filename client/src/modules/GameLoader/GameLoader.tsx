import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Texture } from "three";
import { socket } from "../../libs/socket";
import createStore from "../../libs/store";
import { TextureLoader } from "../TextureLoader/TextureLoader";

type GameLoaderProps = {
  children: React.ReactNode;
};

export const gameStore = createStore({ map: null, player: null });
export const componentsStore = createStore<
  {
    name: string;
    component: Texture;
  }[]
>([]);

export const GameLoader = ({ children }: GameLoaderProps) => {
  const [isSocketConnectionEstablished, setisSocketConnectionEstablished] =
    useState(false);

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

    socket.on("map:load", (data) => {
      gameStore.setState((prev) => ({ ...prev, data }));
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
        <TextureLoader
          isSocketConnectionEstablished={isSocketConnectionEstablished}
          textures={{
            map: "./assets/ruiny-szabrownikow.png",
            player: "./player.png",
          }}
        >
          {children}
        </TextureLoader>
      </Canvas>
    </>
  );
};
