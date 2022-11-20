import { componentsStore } from "../modules/GameLoader/GameLoader";

const useGameComponent = () => {
  const gameComponents = componentsStore.useStore((state) => state);

  const getComponentByName = (componentName: string) =>
    gameComponents.find((component) => component.name === componentName);

  return { getComponentByName, gameComponents };
};

export default useGameComponent;
