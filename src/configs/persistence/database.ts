import mongoose, { ConnectOptions } from "mongoose";

import appConfig from "..";
import createLogger, { ModuleType } from "../../utils/logger";

const logger = createLogger(ModuleType.Entry, "ENTRY");

export async function connectMongoDb(): Promise<void> {
  const options = {
    family: 4,
  } as ConnectOptions;

  try {
    if (appConfig.isDev) mongoose.set("debug", true);
    await mongoose.connect(appConfig.mongoDbUri, options);

    logger.info("Database connected", {});
  } catch (error) {
    logger.error(`Database error: ${error.message}`, { error });
    throw error;
  }

  // Listen for errors after the initial connection
  mongoose.connection.on("error", (error) => {
    logger.info(`Database error: ${error.message}`, { error });
  });
}

export async function closeMongoDb(): Promise<void> {
  await mongoose.disconnect();
  logger.info("Database disconnected", {});
  process.exit(0);
}
