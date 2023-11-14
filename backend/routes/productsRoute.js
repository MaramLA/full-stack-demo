import { Router } from "express";

import {
  addSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
} from "../controllers/productsController.js";
import {
  productIdValidation,
  validateCreateProduct,
  validateUpdateProduct,
} from "../validators/productValidator.js";
import { runValidation } from "../validators/index.js";

const router = Router();

router.get("/", getAllProducts);

router.post("/", validateCreateProduct, runValidation, addSingleProduct);

router.get("/:id", productIdValidation, runValidation, getSingleProduct);

router.delete("/:id", productIdValidation, runValidation, deleteSingleProduct);

router.put(
  "/:id",
  productIdValidation,
  validateUpdateProduct,
  runValidation,
  updateSingleProduct
);

export default router;
