'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { updateTotalPrice, plus1, minus1, deleteFromCart } from '@/state/counter/priceSlice';
import { decreament, increament } from '@/state/counter/counterSlice';

import Modal from 'react-modal';
import CouponInput from './couponInput';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function CartItems() {
  // Fetch the cart from the Redux store
  const cart = useSelector((state: RootState) => state.price.cart);
  const totalPrice = useSelector((state: RootState) => state.price.totalPrice);
  const dispatch = useDispatch();

  let subtitle: { style: { color: string; } } = {
    style: {
      color: ''
    }
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const deleteFromCartHandler = (productId: number) => {
    dispatch(deleteFromCart(productId));
    dispatch(updateTotalPrice());
  };

  return (
    <div>
      {cart.length === 0 ? (
        <div className='text-center'>
          <p>Your cart is empty.</p>
          <a href='/' className='btn btn-primary p-3 my-4'>start shopping!</a>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className='drop-shadow rounded-md my-4'>
                <div className='flex gap-20 justify-between max-w-4xl p-3'>
                  <div className='flex gap-4'>
                    <Image src={product.image} alt='' width={50} height={50} />
                    <div className=''>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className='text-center'>
                      <p>${product.price * product.quantity}</p>
                      <span className='flex gap-4 items-align'><button className='p-1 w-6 rounded-md hover:bg-gray-200 text-lg' onClick={() => minus1Handler(product.id)}>-</button><p>{product.quantity}</p><button className='p-1 w-6 rounded-md hover:bg-gray-200 text-lg' onClick={() => plus1Handler(product.id)}>+</button></span>
                    </div>
                    <button onClick={() => deleteFromCartHandler(product.id)}>
                      <Image src='/icons8-delete.svg' height={20} width={20} alt='remove-product-icon' />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex justify-between items-center'>
            <div>
              <button className='btn btn-primary' onClick={openModal}>Proceed to checkout</button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Proceed to payment and coupon"
              >
                <div className='flex justify-end'>
                  <button onClick={closeModal}><Image src='/icons8-close.svg' alt='close icon' height={20} width={20} /></button>
                </div>

                <div>
                  <CouponInput />
                </div>
              </Modal>
            </div>
            <p>Totoal: <span className='text-lg'>${totalPrice}</span></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItems;