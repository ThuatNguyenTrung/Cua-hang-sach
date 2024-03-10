import express from "express";

import {
  createProduct,
  createReview,
  deleteProduct,
  get10RandomProducts,
  getAllProducts,
  getNewProducts,
  getProductById,
  getRandomProducts,
  getRelativeProducts,
  getTopProducts,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, authorizeAdmin, createProduct);
router.route("/all").get(getAllProducts);
router.route("/:id/detail").get(getProductById);
router.route("/random").get(getRandomProducts);
router.route("/top").get(getTopProducts);
router.route("/new").get(getNewProducts);
router.route("/:id/relative").get(getRelativeProducts);
router.route("/:id/update").put(authenticate, authorizeAdmin, updateProduct);
router.route("/:id/delete").delete(authenticate, authorizeAdmin, deleteProduct);
router.route("/:id/review").post(authenticate, createReview);
router.route("/search").get(searchProducts);
router.route("/random10").get(get10RandomProducts);

export default router;
