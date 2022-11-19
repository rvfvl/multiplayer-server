import { useContext } from "react";
import { AssetsContext } from "../modules/AssetsLoader/AssetsLoader";

const useAsset = () => {
  const context = useContext(AssetsContext);

  if (!context) {
    throw new Error("useAsset must be used within an AssetsProvider");
  }

  return context;
};

export default useAsset;
