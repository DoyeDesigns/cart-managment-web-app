'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { updateTotalPrice, plus1, minus1, removeFromCart, deleteFromCart } from '@/state/counter/priceSlice';
import { decreament, increament } from '@/state/counter/counterSlice';

function CartItems () {
    // Fetch the cart from the Redux store
    const cart = useSelector((state: RootState) => state.price.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(cart)
      }, [cart]);

      const plus1Handler = (productId: number) => {
          dispatch(plus1(productId));
          dispatch(updateTotalPrice());
          dispatch(increament())
        // }
      };

      const minus1Handler = (productId: number) => {
          dispatch(minus1(productId));
          dispatch(updateTotalPrice());
          dispatch(decreament());
        // }
      };

      const removeFromCartHandler = (productId: number) => {
        dispatch(removeFromCart(productId));
      };

      const deleteFromCartHandler = (productId: number) => {
        dispatch(deleteFromCart(productId));
        dispatch(updateTotalPrice());
      };

      return (
        <div>
        {cart.length === 0 ? (
            <div className='text-center'>
            <p>Your cart is empty.</p>
            <a href='/' className='p-3'>start shopping!</a>
            </div>
          ) : (
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  <div className='flex gap-20 justify-between max-w-4xl'>
                    <div className='flex gap-4'>
                      <Image src={product.image} alt='' width={50} height={50}/>
                      <div className=''>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='text-center'>
                            <p>${product.price * product.quantity}</p>
                            <span className='flex gap-4'><button onClick={() => minus1Handler(product.id)}>-</button><p>{product.quantity}</p><button onClick={() => plus1Handler(product.id)}>+</button></span>
                        </div>
                        <button onClick={() => deleteFromCartHandler(product.id)}>
                            <Image src='/icons8-delete.svg' height={20} width={20} alt='remove-product-icon'/>
                        </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
}

export default CartItems;