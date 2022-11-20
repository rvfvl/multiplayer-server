import { Html, useProgress, useTexture } from "@react-three/drei";
import React from "react";

type TextureLoaderProps = {
  children: React.ReactNode;
  isSocketConnectionEstablished: boolean;
  textures: Record<string, string>;
};

export const TextureContext = React.createContext({});

export const TextureLoader = ({
  children,
  isSocketConnectionEstablished,
  textures,
}: TextureLoaderProps) => {
  const loadedTextures = useTexture(textures);
  const { progress } = useProgress();

  if (progress < 100 || !isSocketConnectionEstablished) {
    return (
      <Html
        fullscreen
        style={{
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Loading...</h1>
      </Html>
    );
  }

  return (
    <TextureContext.Provider value={loadedTextures}>
      {children}
    </TextureContext.Provider>
  );
};
