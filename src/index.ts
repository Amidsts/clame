import app from "./configs/app";
import appConfig from "./configs";
import createLogger, { ModuleType } from "./utils/logger";
import { connectMongoDb } from "./configs/persistence/database";
// import { requestHandler } from "./configs/agents";

const logger = createLogger(ModuleType.Entry, "ENTRY");
const { port, environment, nodeEnv } = appConfig;

(async () => {
  if (!nodeEnv) {
    logger.error("Node environment not found");
    process.exit(1);
  }

  logger.info("Starting the Clame server...", {});

  await connectMongoDb();

  // const res = await requestHandler('knee guard, sport outfit');
  // console.log("AI response", res.output_text);

  app.listen(port, () => {
    logger.info(
      `${environment?.toLocaleUpperCase()} is running on port ${port}...`,
      {}
    );
  });
})().catch((error) => {
  logger.error(`Error starting the server: ${error.message}`, { error });
  process.exit(1);
});
