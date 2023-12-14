'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import data from '../services/products-list-data.json'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { addToCart, updateTotalPrice, plus1, minus1, deleteFromCart } from '@/state/counter/priceSlice';
import { increament, decreament } from '@/state/counter/counterSlice';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  initialQuantity: number;
  image: string;
}

function ProductsList() {
  const cart = useSelector((state: RootState) => state.price.cart);
  const productQuantities = useSelector((state: RootState) => state.price.productQuantities);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cart)
  }, [cart]);

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(updateTotalPrice())
  };

  const deleteFromCartHandler = (productId: number) => {
    dispatch(deleteFromCart(productId));
    dispatch(updateTotalPrice());
  };

  const plus1Handler = (productId: number, productPrice: number) => {
      dispatch(plus1(productId));
      dispatch(updateTotalPrice());
      dispatch(increament())
    // }
  };

  const minus1Handler = (productId: number, productPrice: number) => {
      dispatch(minus1(productId));
      dispatch(updateTotalPrice());
      dispatch(decreament());
    // }
  };


  return (
    <ul className='flex flex-wrap justify-center gap-4 mx-auto mb-5'>
      {data.map((product: Product) => (
        <li key={product.id}>
          <div className="card w-64 h-96 bg-base-100 shadow-xl">
            <figure><Image src={product.image} alt={product.name} height={100} width={270} className='object-cover'/></figure>
            <div className="card-body p-4">
              <div className='flex gap-4 justify-between items-center'>
                <h2 className="card-title">
                {product.name}
                </h2>
                <div className="">$<span id='product-price' className='text-sm'>{product.price}</span></div>
              </div>
              <p className='text-sm'>{product.description}</p>
              <div className='flex gap-1 justify-between'>
              {cart.some((item) => item.id === product.id) ? (
                <button className='btn btn-primary p-2 rounded-md' onClick={() => deleteFromCartHandler(product.id)}>
                  Remove from cart
                </button>
              ) : (
                <button className='btn btn-primary p-2 rounded-md' onClick={() => addToCartHandler(product)}>
                  Add to cart
                </button>
              )}
              <span className='flex gap-4 items-center'>
                <button className='p-1 w-6 rounded-md hover:bg-gray-200 text-lg' id='minus-one' onClick={() => minus1Handler(product.id, product.price)}>
                  -
                </button>
                <span>{productQuantities[product.id] || 0}</span>
                <button className='p-1 w-6 rounded-md hover:bg-gray-200 text-lg' id='plus-one' onClick={() => plus1Handler(product.id, product.price)}>
                  +
                </button>
              </span>
              </div>
              <div className="card-actions justify-start">
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
