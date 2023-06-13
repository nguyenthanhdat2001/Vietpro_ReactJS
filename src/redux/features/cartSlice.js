import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
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
      !isExists && data.push({ ...action.payload, isCheck: false });
    },
    updateCart: (state, action) => {
      const data = state.data;
      data.map((item) => {
        if (item._id === action.payload._id) {
          item.qty = action.payload.qty;
        }
        return item;
      });
    },
    deleteCart: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    selectItemCart: (state, action) => {
      state.data.map((item) => {
        if (item._id === action.payload) {
          item.isCheck = !item.isCheck;
        }
        return item;
      });
    },
    clearCart: (state, action) => {
      state.data = [];
    },
  },
});

export const { addToCart, updateCart, deleteCart, clearCart, selectItemCart } =
  cartSlice.actions;

export default cartSlice.reducer;
