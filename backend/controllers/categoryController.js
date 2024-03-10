import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    if (!data.name) {
      res.status(400);
      throw new Error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const existingCategory = await Category.findOne({ name: data.name });
    if (existingCategory) {
      res.status(400);
      throw new Error("Danh mục đã tồn tại!");
      return;
    }
    const category = new Category(data);
    await category.save();
    res.status(201).json({
      message: `Đã tạo danh mục ${data.name} thành công!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res.status(400);
      throw new Error("Không tìm thấy danh mục!");
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400);
      throw new Error("Không tìm thấy danh mục!");
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400);
      throw new Error("Không tìm thấy danh mục!");
      return;
    }
    const data = req.body;
    category.name = data.name || category.name;
    const updatedCategory = await category.save();
    res.status(200).json({
      message: `Đã cập nhật danh mục ${category.name} thành công!`,
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(400);
      throw new Error("Không tìm thấy danh mục!");
      return;
    }
    res.status(200).json({
      message: `Đã xóa danh mục ${category.name} thành công!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
