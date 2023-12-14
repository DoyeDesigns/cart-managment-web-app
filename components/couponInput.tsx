'use client'
import Image from "next/image";

import { useState } from 'react'
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, setDiscountAmount, clearCoupon } from '@/state/counter/couponSlice';



function CouponInput() {
  const totalPrice = useSelector((state: RootState) => state.price.totalPrice);
  const [couponValue, setCouponValue] = useState('');
  const coupon = useSelector((state: RootState) => state.coupon.appliedCoupon);
  // const discountAmount = useSelector((state: RootState) => state.coupon.discountAmount);
  const dispatch = useDispatch();

  const discountAmount = coupon?.discountAmount ?? 0;

  const discountedTotal = totalPrice - discountAmount;

  const validCouponCode = 'WEB3BRIDGECOHORTx';

  const useCoupon = () => {
    if (coupon) {
      // If a coupon is already applied, clear it
      dispatch(clearCoupon());
    } else {
      // Check if the entered coupon code is valid
      if (couponValue === validCouponCode) {
        // Apply the coupon
        dispatch(applyCoupon({ code: validCouponCode, discountPercentage: 10 }));

        // Calculate the discount amount based on the total price
        const calculatedDiscountAmount = (totalPrice * 10) / 100;

        // Dispatch the discount amount to the store
        dispatch(setDiscountAmount(calculatedDiscountAmount));
      } else if (couponValue === '') {
        alert('enter a coupon code');
      } else {
        // Handle invalid coupon code (e.g., show an error message)
        alert('enter correct coupon "WEB3BRIDGECOHORTx"');
      }
    }
  };

  return (
    <label className="form-control w-full max-w-xs flex">
      <div className="text-center">
        <div className="flex justify-center">
          <Image src='/bubble-gum-payment-process-1.png' alt='payment illustration' width={180} height={180} className="rounded-full" />
        </div>
        <p className="text-lg font-semibold mb-4">Total Amount: ${coupon ? discountedTotal.toFixed(2) : totalPrice}</p>
        <button className="btn btn-primary rounded-lg mb-4">Pay now</button>
        {coupon && (
          <div className="text-center text-sm">
            <p>Coupon discount Amount: ${coupon.discountAmount.toFixed(2)}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-end">
        <div>
          <div className="label">
            <span className="label-text text-xs">Add your coupon code here</span>
          </div>
          <input onChange={(e) => setCouponValue(e.target.value)} type="text" placeholder="Enter coupon" className="input input-bordered w-full max-w-xs" />
        </div>
        <button className="btn btn-primary rounded-md" onClick={() => useCoupon()}>{coupon ? 'Remove coupon' : 'Use coupon'}</button>
      </div>
    </label>
  )
}

export default CouponInput;