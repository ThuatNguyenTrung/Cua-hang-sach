import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getProfile,
  getProfileById,
  loginUser,
  logoutUser,
  updateProfile,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/").post(logoutUser);
router.route("/profile").get(authenticate, getProfile);
router.route("/update").put(authenticate, updateProfile);
router.route("/all").get(authenticate, authorizeAdmin, getAllUsers);
router.route("/profile/:id").get(authenticate, authorizeAdmin, getProfileById);
router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteUser);

export default router;
