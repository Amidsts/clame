import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import csv from "csv-parser";
import fs from "fs";

export const validateInput =
  (schema: Joi.ObjectSchema<any>, fieldType: "body" | "params" | "query" = "body") =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      let parsedData;
      if (fieldType === "body") {
        parsedData = schema.validate(req.body);
        req.body = parsedData;
      } else if (fieldType === "params") {
        parsedData = schema.validate(req.params);
        req.params = parsedData;
      } else if (fieldType === "query") {
        parsedData = schema.validate(req.query);
        req.query = parsedData;
      }

      next();
    } catch (err) {
      next(Error(`${err.errors[0].path}: ${err.errors[0].message}`));
    }
  };

export function parseCsvFile(filePath): Promise<Array<any>> {
  const result = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => result.push(data))
      .on("end", () => resolve(result))
      .on("error", (error) => reject(error));
  });
}
