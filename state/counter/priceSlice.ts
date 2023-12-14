import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  initialQuantity: number;
  image: string;
}

interface PriceState {
  cart: Product[];
  productQuantities: Record<number, number>;
  totalPrice: number;
  totalQuantity: number;
}

const initialState: PriceState = {
  cart: [],
  productQuantities: {},
  totalPrice: 0,
  totalQuantity: 0,
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
      state.totalPrice = parseFloat(
        state.cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
      );
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

        // Update total price
        state.totalPrice = parseFloat(
          state.cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
        );
      }
    },
    updateTotalPrice: (state) => {
      // Update total price (same logic as addToCart and removeFromCart)
      state.totalPrice = parseFloat(
        state.cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
      );
    },
    plus1: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((product) => product.id === productId);
      

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.productQuantities[productId] = (state.productQuantities[productId] || 0) + 1;

        // Update total price
        state.totalPrice = parseFloat(
          state.cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
        );
      } 
    },
    minus1: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((product) => product.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.productQuantities[productId] = (state.productQuantities[productId] || 0) - 1;
        
        // Update total price 
        state.totalPrice = parseFloat(
          state.cart.reduce((total, product) => total - product.price * product.quantity, 0).toFixed(2)
        );
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const deletedProduct = state.cart.find((product) => product.id === productId);

      if (deletedProduct) {
        const updatedCart = state.cart.filter((product) => product.id !== productId);
        state.cart = updatedCart;

        // Update total price 
        state.totalPrice = parseFloat(
          updatedCart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
        );

        // Update total quantity
        state.totalQuantity -= deletedProduct.quantity;

        // Reset quantity of the deleted product
        state.productQuantities[productId] = 0;

        // Reset quantity to the initial quantity of the deleted product
        deletedProduct.quantity = deletedProduct.initialQuantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateTotalPrice, minus1, plus1, deleteFromCart } = priceSlice.actions;
export default priceSlice.reducer;
