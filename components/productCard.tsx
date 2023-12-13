'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import data from '../services/products-list-data.json'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { addToCart, removeFromCart, updateTotalPrice, plus1, minus1, deleteFromCart } from '@/state/counter/priceSlice';
import { increament, decreament } from '@/state/counter/counterSlice';

// const numOfProduct

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
  //create a cart variable
  // const [cart, setCart] = useState<Product[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [productQuantities, setProductQuantities] = useState<{ [productId: number]: number }>({});
  const cart = useSelector((state: RootState) => state.price.cart);
  const productQuantities = useSelector((state: RootState) => state.price.productQuantities);
  const dispatch = useDispatch();

  //add to cart function
  // const addToCart = (product: Product) => {
  //   //check if product is lredy in cart
  //   if (!cart.some((item) => item.id === product.id))
  //   setCart((prevCart) => [...prevCart, product]);
  //   setSelectedProduct(product);
  // };

  useEffect(() => {
    console.log(cart)
  }, [cart]);

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(updateTotalPrice())
  };

  const removeFromCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
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
    <ul className='flex flex-wrap justify-center gap-4 mx-auto'>
      {data.map((product: Product) => (
        <li key={product.id}>
          <div className="card w-64 h-96 bg-base-100 shadow-xl">
            <figure><Image src={product.image} alt="Shoes" height={100} width={270} className='object-cover'/></figure>
            <div className="card-body p-4">
              <div className='flex gap-4 justify-between items-center'>
                <h2 className="card-title">
                {product.name}
                </h2>
                <div className="">$<span id='product-price' className='text-sm'>{product.price}</span></div>
              </div>
              <p className='text-sm'>{product.description}</p>
              <div className='flex justify-between'>
              {cart.some((item) => item.id === product.id) ? (
                <button onClick={() => deleteFromCartHandler(product.id)}>
                  Remove from cart
                </button>
              ) : (
                <button onClick={() => addToCartHandler(product)}>
                  Add to cart
                </button>
              )}
              <span className='flex gap-4'>
                <button id='minus-one' onClick={() => minus1Handler(product.id, product.price)}>
                  -
                </button>
                <span>{productQuantities[product.id] || 0}</span>
                <button id='plus-one' onClick={() => plus1Handler(product.id, product.price)}>
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
