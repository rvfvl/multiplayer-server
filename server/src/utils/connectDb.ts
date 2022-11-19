import mongoose from "mongoose";
import logger from "./logger";

export default async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/valart?authSource=admin");
  } catch (error) {
    // @ts-ignore
    logger.error(error.message);
  }
};
