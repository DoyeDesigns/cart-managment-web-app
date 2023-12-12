import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  initialQuantity: number;
}

interface PriceState {
  cart: Product[];
  productQuantities: Record<number, number>;
  totalPrice: number;
}

const initialState: PriceState = {
  cart: [],
  productQuantities: {},
  totalPrice: 0,
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      state.productQuantities[id] = (state.productQuantities[id] || 0) + 1;

      // Update total price here
      state.totalPrice = state.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((product) => product.id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cart = state.cart.filter((product) => product.id !== productId);
        }

        state.productQuantities[productId] = (state.productQuantities[productId] || 0) - 1;

        // Update total price here
        state.totalPrice = state.cart.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      }
    },
    updateTotalPrice: (state) => {
      // Update total price here (same logic as addToCart and removeFromCart)
      state.totalPrice = state.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
    plus1: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((product) => product.id === productId);
      

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.productQuantities[productId] = (state.productQuantities[productId] || 0) + 1;

        // Update total price here
        state.totalPrice = state.cart.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      } 
    },
    minus1: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((product) => product.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.productQuantities[productId] = (state.productQuantities[productId] || 0) - 1;
        // Update total price here
        state.totalPrice = state.cart.reduce((total, product) => {
          return total - product.price * product.quantity;
        }, 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateTotalPrice, minus1, plus1 } = priceSlice.actions;
export default priceSlice.reducer;
