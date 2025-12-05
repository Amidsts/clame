import ProductModel from "../../models/products/products.model";
import { parseCsvFile } from "../../utils/helpers";
import createLogger, { ModuleType } from "../../utils/logger";

const logger = createLogger(ModuleType.Controller, "POPULATE_PRODUCT");

async function populateProductData() {
  const products = await parseCsvFile("products.csv");

  try {
    logger.info("Populating product data...", {});
    await ProductModel.create(products);
  } catch (error) {
    logger.error("Error populating product data", { error });
    throw error;
  }
}

// export default populateProductData;
