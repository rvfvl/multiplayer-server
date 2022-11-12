import { loadMapsData } from "../../utils/maps-loader";
import MapInstance, { MapData } from "../entities/MapInstance";

class MapManager {
  private registeredMaps: MapInstance[] = [];

  constructor() {
    this.registeredMaps = loadMapsData().map((map) => new MapInstance(map));
  }
}

export default MapManager;
