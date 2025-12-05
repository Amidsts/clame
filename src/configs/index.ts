import "dotenv/config";

const { env } = process;

const appConfig = {
  environment: env.NODE_ENV,
  port: env.PORT,
  isDev: env.NODE_ENV === "DEVELOPMENT",
  mongoDbUri: env.DATABASE_URL || "",
  openAiApiKey: env.OPENAI_API_KEY || "",
  allowedOrigins: env.ALLOWED_ORIGINS?.split(",") || [],
  nodeEnv: env.NODE_ENV,
};

export default appConfig;
