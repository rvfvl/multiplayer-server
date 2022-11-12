import { loadMapsData } from "../../utils/maps-loader";

export type MapData = ReturnType<typeof loadMapsData>[number];

class MapInstance {
  private mapData: MapData;

  constructor(map: MapData) {
    this.mapData = map;
  }
}

export default MapInstance;
