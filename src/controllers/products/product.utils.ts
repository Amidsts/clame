import ProductModel, {
  IProduct,
  ProductCategory,
} from "../../models/products/products.model";
import createLogger, { ModuleType } from "../../utils/logger";

const logger = createLogger(ModuleType.Util, "PRODUCT UTILS");

export async function processProductCategories(
  productCategories: string[]
): Promise<IProduct[]> {
  if (!productCategories.length) {
    logger.info("There are no products found for empty categories", {
      productCategories,
    });
    return [];
  }

  const availableCategories = getAvailableCategories(productCategories);
  if (!availableCategories.length) {
    logger.info("There are no products found for unknown categories", {
      productCategories,
      availableCategories,
    });
    return [];
  }

  logger.info("available categories for product search", {
    availableCategories,
    productCategories,
  });
  const products = await ProductModel.findProductsByCategory(
    availableCategories
  );

  logger.info("products found for the available categories", {
    products,
    availableCategories,
  });
  return products;
}

function getAvailableCategories(productCategories: string[]): string[] {
  return productCategories.filter((category) => {
    return Object.values(ProductCategory).includes(category as ProductCategory);
  });
}
