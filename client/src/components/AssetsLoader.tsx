import React from "react";
import { useTexture, useProgress, Html } from "@react-three/drei";

type AssetsLoaderProps = {
  assets: Record<string, string>;
  children: React.ReactNode;
};

export const AssetsContext = React.createContext({});

const AssetsLoader = ({ children, assets }: AssetsLoaderProps) => {
  const textures = useTexture(assets);
  const { progress } = useProgress();
  console.log("textures", textures);
  if (progress < 100) {
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
    <AssetsContext.Provider value={textures}>{children}</AssetsContext.Provider>
  );
};

export default AssetsLoader;
