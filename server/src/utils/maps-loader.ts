import fs from "fs";
import path from "path";
import logger from "./logger";

export const loadMapsData = () => {
  logger.info("Loading maps...");
  try {
    const maps = [];
    const files = fs.readdirSync(path.join(__dirname, "../data/maps"));

    for (const file of files) {
      const fileContent = fs.readFileSync(
        path.join(__dirname, `../data/maps/${file}`),
        "utf8"
      );
      const mapData = JSON.parse(fileContent);

      const tiles = mapData.layers[0].data;
      const width = mapData.layers[0].width;
      const height = mapData.layers[0].height;
      const name = mapData.properties.find((i: any) => i.name === "name").value;
      const imageName = mapData.properties.find(
        (i: any) => i.name === "imageName"
      ).value;

      if (!name) throw new Error(`Map ${file} has no name property`);
      if (!imageName) throw new Error(`Map ${file} has no imageName property`);

      const tileProperties = new Map();

      for (const set of mapData.tilesets) {
        for (const tile of set.tiles) {
          tileProperties.set(tile.id + 1, tile.properties);
        }
      }

      maps.push({
        tiles,
        width,
        height,
        name,
        imageName,
      });
    }

    return maps;
  } catch (error) {
    // @ts-ignore
    logger.error(`Loader.ts - ${error.message}`);
  }
};
