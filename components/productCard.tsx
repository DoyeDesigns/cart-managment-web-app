'use client'

import React, { useState, useEffect } from 'react';
import data from '../services/products-list-data.json'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { addToCart, removeFromCart, updateTotalPrice, plus1, minus1 } from '@/state/counter/priceSlice';
import { increament, decreament } from '@/state/counter/counterSlice';

// const numOfProduct

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  initialQuantity: number;
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

  const plus1Handler = (productId: number, productPrice: number) => {
    // const existingProduct = cart.find((product) => product.id === productId);

    // if (existingProduct) {
      // Product is already in the cart, increase quantity
      dispatch(plus1(productId));
      dispatch(updateTotalPrice());
      dispatch(increament())
    // }
  };

  const minus1Handler = (productId: number, productPrice: number) => {
    // const existingProduct = cart.find((product) => product.id === productId);
    
    // if (existingProduct) {
      // Product is already in the cart, increase quantity
      dispatch(minus1(productId));
      dispatch(updateTotalPrice());
      dispatch(decreament());
    // }
  };


  return (
    <ul className='flex flex-wrap justify-center gap-4 mx-auto'>
      {data.map((product: Product) => (
        <li key={product.id}>
          <div className="card w-60 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">
              {product.name}
              </h2>
              <p>{product.description}</p>
              <div className='flex justify-between'>
              <button onClick={() => addToCartHandler(product)}>Add to cart</button>
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
                <div className="">#<span id='product-price'>{product.price}</span></div>
              </div>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
