import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    user: "Rohit",
    quantity: 0,
    cartItems: [],
    totalAmount: 0,
    search: "",
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const isExistItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (!isExistItem) {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
      state.quantity++;
      state.totalAmount += payload.price;
    },

    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.quantity -= payload.quantity;
      state.totalAmount -= payload.price * payload.quantity;
    },

    addItemQuantity: (state, { payload }) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.quantity++;
      state.totalAmount += payload.price;
    },

    subtractItemQuantity: (state, { payload }) => {
      const subItem = state.cartItems.find((item) => item.id === payload.id);
      if (subItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== subItem.id
        );
      } else {
        subItem.quantity -= 1;
      }
      state.quantity--;
      state.totalAmount -= subItem.price;
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.quantity = 0;
      state.totalAmount = 0;
    },
    searchItems: (state, { payload }) => {
      state.search = payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addItemQuantity,
  subtractItemQuantity,
  searchItems,
  resetCart,
} = productsSlice.actions;

export default productsSlice.reducer;
