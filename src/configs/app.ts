import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import helmet from "helmet";

import { handleResponse } from "../utils/response";
import { v1Routes } from "../routes";
import appConfig from ".";
import { RouteError } from "./errors";

const app = express();

const { allowedOrigins: origin, environment } = appConfig;

app
  .use(cors({ origin }))
  .use(express.json({ limit: "10mb" }))
  .use(express.urlencoded({ limit: "10mb" }))
  .use(helmet())
  .use((err: any, _req: Request, res: Response, next: NextFunction) => {
    let error;

    if (err instanceof RouteError) {
      error = { message: err.message, statusCode: err.statusCode };
    } else {
      error = {
        message: "Something went wrong, try again later",
        statusCode: 500,
      };
    }

    return handleResponse({
      res,
      status: error.statusCode,
      data: error,
    });
  });

// Initialize Routes
app.get("/", (_req, res) => {
  res.json({ message: "welcome. Testing..." });
});

app.use("/v1", v1Routes);

// Catch-all 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
