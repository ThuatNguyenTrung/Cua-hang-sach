import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    if (!data.username || !data.email || !data.password) {
      res.status(400);
      throw new Error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.status(400);
      throw new Error("Tài khoản đã tồn tại!");
      return;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = new User(data);
    await user.save();
    createToken(res, user._id);
    res.status(201).json({
      message: `Đã tạo tài khoản ${data.username} thành công!`,
      user,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      res.status(400);
      throw new Error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      res.status(400);
      throw new Error("Tài khoản không tìm thấy!");
      return;
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Sai mật khẩu!");
      return;
    }
    createToken(res, user._id);
    res.status(200).json({
      message: `Đăng nhập tài khoản ${user.username} thành công!`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt", { http: true, expires: new Date(0) });
    res.status(200).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(400);
      throw new Error("Không tìm thấy tài khoản!");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(400);
      throw new Error("Không tìm thấy tài khoản!");
      return;
    }
    const data = req.body;

    user.username = data.username || user.username;
    user.email = data.email || user.email;

    if (user.isAdmin) {
      user.isAdmin = true;
    }

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }
    await user.save();
    res.status(200).json({
      message: `Đã thay đổi tài khoản ${user.username} thành công!`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400);
      throw new Error("Không tìm thấy người dùng");
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const getProfileById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("Không tìm thấy người dùng");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("Không tìm thấy người dùng");
      return;
    }
    res
      .status(200)
      .json({ message: `Đã xóa tài khoản ${user.username} thành công!` });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  getAllUsers,
  getProfileById,
  deleteUser,
};
