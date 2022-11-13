import { loadMapsData } from "../../utils/maps-loader";
import MapInstance, { MapData } from "../entities/MapInstance";

class MapManager {
  private registeredMaps: MapInstance[] = [];

  constructor() {
    this.registeredMaps = loadMapsData().map((map) => new MapInstance(map));
  }

  public getAllMaps = () => this.registeredMaps;

  public getMapByName = (name: string) =>
    this.registeredMaps.find((map) => map.getMapData().name === name);
}

export default MapManager;
