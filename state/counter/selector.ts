import { RootState } from "../store";

export const selectTotalQuantity = (state: RootState) => {
  const productQuantities = state.price.productQuantities;
  const totalQuantity = Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);
  return totalQuantity;
};