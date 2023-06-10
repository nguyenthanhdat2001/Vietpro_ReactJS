import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("Cart")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const data = state.data;
      let isExists = false;
      //if item exists
      data.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += action.payload.qty;
          isExists = true;
        }
        return item;
      });
      // if new item
      !isExists && data.push(action.payload);
      localStorage.setItem("Cart", JSON.stringify(data));
    },
    updateCart: (state, action) => {
      const data = state.data;
      data.map((item) => {
        if (item._id === action.payload._id) {
          item.qty = action.payload.qty;
        }
        return item;
      });
      localStorage.setItem("Cart", JSON.stringify(data));
    },
    deleteCart: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
      localStorage.setItem("Cart", JSON.stringify(state.data));
    },
  },
});

export const { addToCart, updateCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
