import { Router, Request, Response } from "express";
import { searchProductSchema } from "./validations";
import { validateInput } from "../../../utils/helpers";
import { searchProduct } from "../../../controllers/products";
import { handleResponse } from "../../../utils/response";

const router = Router();

router.post(
  "/search",
  validateInput(searchProductSchema),
  async (req: Request, res: Response) => {
    const { productInfo } = req.body;

    const data = await searchProduct(productInfo);

    return handleResponse({ res, data });
  }
);

export { router as productRoutes };
