import { RouteError } from "../../configs/errors";
import * as client from "../../configs/openai";
import createLogger, { ModuleType } from "../../utils/logger";
import { AgentProductSearchResponse } from "./types";

const logger = createLogger(ModuleType.Controller, "PRODUCT CONTROLLER");

export async function searchProduct(productInfo: string) {
  //send product info to AI agent
  const response = await client.searchProduct(productInfo);
  if (!response) {
    const error = new RouteError(
      "AI Agent could not process the product search"
    );

    logger.info(error.message, { error, productInfo });
    throw error;
  }

  logger.info("AI Agent product search response", { response });
  const { categories, status, message, input_text } = JSON.parse(
    response
  ) as AgentProductSearchResponse;

  //process response
  const searchProducts = productSearchHandler(categories);
  const availableMatchingProducts = searchProducts[status];
  //return response
}

const productSearchHandler = (productCategories: string[]) => {
  return {
    FOUND: processFoundProductCategories(productCategories),
    NOT_FOUND: processNotFoundProductCategories(productCategories),
    SIMILAR: processSimilarProductCategories(productCategories),
  };
};
