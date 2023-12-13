'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { selectTotalQuantity } from "@/state/counter/selector";

function CartPage() {
  // Fetch the cart from the Redux store
  const cart = useSelector((state: RootState) => state.price.cart);
  const totalQuantity = useSelector(selectTotalQuantity);
  
  useEffect(() => {
    console.log(cart)
  }, [cart]);

  
  return (
    <div className='flex justify-center'>
      <div>
      <h2>Your Shopping Cart ({totalQuantity})</h2>
      <div className="divider"></div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <div>
                <div className='flex gap-4'>
                  <Image src={product.image} alt='' width={50} height={50}/>
                  <div className=''>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price * product.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default CartPage;
