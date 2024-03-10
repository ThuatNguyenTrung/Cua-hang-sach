import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.name ||
      !data.image ||
      !data.author ||
      !data.description ||
      !data.category ||
      !data.price
    ) {
      res.status(400);
      throw new Error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const product = new Product(data);
    await product.save();
    res.status(201).json({
      message: `Đã tạo sách ${data.name} thành công!`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(400);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getRandomProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: {
          size: 3,
        },
      },
    ]);
    if (!products) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(3);
    if (!products) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(6);
    if (!products) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getRelativeProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    const products = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    const data = req.body;
    product.name = data.name || product.name;
    product.image = data.image || product.image;
    product.author = data.author || product.author;
    product.description = data.description || product.description;
    product.category = data.category || product.category;
    product.price = data.price || product.price;
    product.countInStock = data.countInStock || product.countInStock;

    await product.save();
    res.status(200).json({
      message: `Đã cập nhật sách ${product.name} thành công!`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    res.status(200).json({
      message: `Đã xóa sách ${product.name} thành công!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const createReview = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Không tìm thấy sách!");
      return;
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Bạn đã đánh giá sách này !");
      return;
    }
    const data = req.body;
    if (!data.rating || !data.comment) {
      res.status(400);
      throw new Error("Vui lòng điền thông tin đánh giá !");
      return;
    }
    const review = {
      name: req.user.username,
      rating: Number(data.rating),
      comment: data.comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    } else {
      product.rating = 0;
    }
    await product.save();
    res.status(200).json({
      message: `Đã đánh giá sách ${product.name} thành công!`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const get10RandomProducts = asyncHandler(async (req, res) => {
  try {
    const productsWithReviews = await Product.aggregate([
      { $match: { reviews: { $exists: true, $ne: [] } } },

      { $sample: { size: 10 } },
    ]);

    res.status(200).json(productsWithReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy sản phẩm." });
  }
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  getRandomProducts,
  getTopProducts,
  getNewProducts,
  getRelativeProducts,
  updateProduct,
  deleteProduct,
  createReview,
  searchProducts,
  get10RandomProducts,
};
