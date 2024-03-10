import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, authorizeAdmin, createCategory);
router.route("/all").get(getAllCategories);
router.route("/:id").get(authenticate, authorizeAdmin, getCategoryById);
router.route("/update/:id").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/delete/:id")
  .delete(authenticate, authorizeAdmin, deleteCategory);

export default router;
