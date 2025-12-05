import { Router, Request, Response } from "express";
import { searchProductSchema } from "./validations";
import { validateInput } from "../../../utils/helpers";

const router = Router();

//TODO:
//setup openAI
//interract with openAI for product search
router.post(
  "/search",
  validateInput(searchProductSchema),
  (req: Request, res: Response) => {
    const { productInfo } = req.body;
    res.send({ message: "Product search endpoint" });
  }
);

export { router as productRoutes };
