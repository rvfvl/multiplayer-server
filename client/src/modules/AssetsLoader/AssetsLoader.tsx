import { Html, useProgress, useTexture } from "@react-three/drei";
import React from "react";

type AssetsLoaderProps = {
  children: React.ReactNode;
  isSocketConnectionEstablished: boolean;
  assets: Record<string, string>;
};

export const AssetsContext = React.createContext({});

export const AssetsLoader = ({
  children,
  isSocketConnectionEstablished,
  assets,
}: AssetsLoaderProps) => {
  const textures = useTexture(assets);
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

  console.log(textures);

  return (
    <AssetsContext.Provider value={textures}>{children}</AssetsContext.Provider>
  );
};
