// couponSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CouponState {
  discountAmount: number;
  appliedCoupon: {
    code: string;
    discountPercentage: number;
    discountAmount: number;
  } | null;
}

const initialState: CouponState = {
  appliedCoupon: null,
  discountAmount: 0
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<{ code: string; discountPercentage: number }>) => {
      const { code, discountPercentage } = action.payload;
      state.appliedCoupon = {
        code,
        discountPercentage,
        discountAmount: 0, // Initialize discountAmount to 0
      };
    },
    clearCoupon: (state) => {
      state.appliedCoupon = null;
    },
    setDiscountAmount: (state, action: PayloadAction<number>) => {
      if (state.appliedCoupon) {
        state.appliedCoupon.discountAmount = action.payload;
      }
    },
  },
});

export const { applyCoupon, clearCoupon, setDiscountAmount } = couponSlice.actions;
export default couponSlice.reducer;
