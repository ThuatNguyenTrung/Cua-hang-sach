import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const calcPrice = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 300000 ? 0 : 30000;
  const taxPrice = Math.round(itemsPrice * 0.1);
  const totalPrice =
    Math.round((itemsPrice + shippingPrice + taxPrice) / 1000) * 1000;

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (
      !orderItems ||
      !orderItems.length ||
      !shippingAddress ||
      !paymentMethod
    ) {
      res.status(400);
      throw new Error("Vui lòng điền đầy đủ thông tin đơn hàng!");
      return;
    }
    const productFromDB = await Product.find({
      _id: { $in: orderItems.map((item) => item._id) },
    });

    const products = orderItems.map((item) => {
      const productDB = productFromDB.find(
        (p) => p._id.toString() === item._id
      );
      return {
        ...item,
        product: productDB._id,
        price: productDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrice(products);

    const data = {
      user: req.user._id,
      orderItems: products,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    const order = await Order.create(data);

    res.status(201).json({
      message: `Đã đặt đơn hàng thành công!`,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      res.status(400);
      throw new Error("Không tìm thấy đơn hàng!");
      return;
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getOrderByIdUser = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      res.status(400);
      throw new Error("Không tìm thấy đơn hàng!");
      return;
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!order) {
      res.status(404);
      throw new Error("Không tìm thấy đơn hàng!");
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
      return;
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res
      .status(200)
      .json({ message: "Đã đánh dấu đơn hàng đã được giao thành công." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi đánh dấu đơn hàng đã được giao." });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
      return;
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    res.status(200).json({ message: "Đã thanh toán đơn hàng thành công!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi thanh toán đơn hàng." });
  }
};

export {
  createOrder,
  getAllOrders,
  getOrderByIdUser,
  getOrderById,
  markOrderAsDelivered,
  markOrderAsPaid,
};
