import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
      itemPrices: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex] = newItem;
      } else {
        state.cartItems.push(newItem);
      }

      state.itemPrices = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemPrices > 300000 ? 0 : 30000;
      state.taxPrice = state.itemPrices * 0.1;
      state.totalPrice =
        (Math.ceil(state.itemPrices + state.shippingPrice + state.taxPrice) /
          1000) *
        1000;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      // Cập nhật lại giá tiền sau khi xóa khỏi giỏ hàng
      state.itemPrices = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemPrices > 300000 ? 0 : 30000;
      state.taxPrice = state.itemPrices * 0.1;
      state.totalPrice =
        (Math.ceil(state.itemPrices + state.shippingPrice + state.taxPrice) /
          1000) *
        1000;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.itemPrices = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
