import { useContext } from "react";
import { Texture } from "three";
import { TextureContext } from "../modules/TextureLoader/TextureLoader";

const useTexture = () => {
  const textures = useContext<Record<string, Texture>>(TextureContext);

  if (!textures) {
    throw new Error("useTexture must be used within an TextureProvider");
  }

  const getTexture = (textureName: string) => {
    const texture = textures[textureName];

    if (!texture) {
      throw new Error(`Texture ${textureName} not found`);
    }

    return texture;
  };

  return { getTexture };
};

export default useTexture;
