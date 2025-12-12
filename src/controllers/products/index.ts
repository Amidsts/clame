import { InternalError, RouteError } from "../../configs/errors";
import * as client from "../../configs/openai";
import { IProduct } from "../../models/products/products.model";
import createLogger, { ModuleType } from "../../utils/logger";
import { processProductCategories } from "./product.utils";
import { AgentProductSearchResponse, AgentProductSearchStatus } from "./types";

const logger = createLogger(ModuleType.Controller, "PRODUCT CONTROLLER");

export async function searchProduct(
  productInfo: string
): Promise<{ message: string; products: IProduct[] }> {
  logger.info("Product search request", { productRequest: productInfo });

  let productDetails: AgentProductSearchResponse;
  try {
    productDetails = await client.prepareProductDetailsForRequest(productInfo);
  } catch (error) {
    logger.error("No product details found for the given request", {
      productRequest: productInfo,
      error,
    });
    return;
  }

  logger.info("AI Agent product search response", { productDetails });
  const { categories, status, message, input_text } = productDetails;

  try {
    const products = await processProductCategories(categories);
    if (!products.length || status === AgentProductSearchStatus.NOT_FOUND) {
      logger.info("No products found for the given categories", {
        categories,
        products,
        input_text,
        status,
      });
    }

    return {
      message,
      products,
    };
  } catch (error) {
    logger.error(error.message, { error, productInfo });
    throw error;
  }
}
