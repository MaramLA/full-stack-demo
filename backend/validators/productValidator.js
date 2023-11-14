import { check } from "express-validator";

export const productIdValidation = [
  check("id").isNumeric().withMessage("product id must be number"),
];

export const validateCreateProduct = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("product title is requried")
    .isLength({ min: 3, max: 200 })
    .withMessage("product name should be within 3-200 characters long"),
  check("price")
    .trim()
    .notEmpty()
    .withMessage("product price is requried")
    .isLength({ min: 1 })
    .withMessage("price must be a positive numbers"),
];

export const validateUpdateProduct = [
  check("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("product title is requried")
    .isLength({ min: 3, max: 200 })
    .withMessage("product name should be within 3-200 characters long"),
  check("price")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("product price is requried")
    .isLength({ min: 1 })
    .withMessage("price must be a positive numbers"),
];
