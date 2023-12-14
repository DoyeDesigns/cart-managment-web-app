'use client'

import { useSelector } from 'react-redux'
import { selectTotalQuantity } from "@/state/counter/selector";
import CartItems from '@/components/cartItems';

function CartPage() {
  const totalQuantity = useSelector(selectTotalQuantity);

  
  return (
    <div className='flex justify-center'>
      <div>
      <h2 className='text-center text-lg mt-6 font-semibold'>Your Shopping Cart ({totalQuantity})</h2>
      <div className="divider"></div>
        <CartItems />
      </div>
    </div>
  );
}

export default CartPage;
