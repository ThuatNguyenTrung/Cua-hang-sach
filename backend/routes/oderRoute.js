import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByIdUser,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controllers/oderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, createOrder);
router.route("/all").get(authenticate, authorizeAdmin, getAllOrders);
router.route("/mine").get(authenticate, getOrderByIdUser);
router.route("/:id/detail").get(authenticate, getOrderById);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);
router.route("/:id/paid").put(authenticate, authorizeAdmin, markOrderAsPaid);

export default router;
