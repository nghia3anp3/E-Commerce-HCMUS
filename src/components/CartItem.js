import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io';
import { CartContext } from '../context/CartContext';

class CartItem extends Component {

  render() {
    const { item, images } = this.props;
    let formatprice = item.price.toLocaleString()
    let totalPrice = (item.price*item.amount).toLocaleString()
    return (
      <CartContext.Consumer>
        {({ removeFromCart, increaseAmount, decreaseAmount }) => (
          <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
            <div className='w-full min-h-[150px] flex items-center gap-x-4'>
              {/* image */}
              <Link to={`/product/${item.id}`}>
                <img className='max-w-[80px]' src={images[0].base_url} alt='' />
              </Link>
              <div className='w-full flex flex-col'>
                {/* title & remove icon */}
                <div className='flex justify-between mb-2'>
                  {/* title */}
                  <Link to={`/product/${item.id}`} className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'>{item.title}</Link>
                  {/* remove icon */}
                  <div onClick={() => removeFromCart(item.id)} className='text-xl cursor-pointer'>
                    <IoMdClose className='text-gray-500 hover:text-red-500 transition ' />
                  </div>
                </div>
                <div className='flex gap-x-2 h-[36px] text-sm'>
                  {/* Qty (amount) */}
                  <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
                    {/* minus icon */}
                    <div onClick={() => decreaseAmount(item.id)} className='flex-1 flex justify-center items-center cursor-pointer h-full '>
                      <IoMdRemove />
                    </div>
                    {/* amount */}
                    <div className='h-full flex justify-center items-center px-2'>{item.amount}</div>
                    {/* plus icon */}
                    <div onClick={() => increaseAmount(item.id)} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                      <IoMdAdd />
                    </div>
                  </div>
                  {/* item price */}
                  <div className='flex-1 flex items-center justify-around'>{formatprice} VND</div>
                  {/* sum price */}
                  {/* 2 decimals */}
                  <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`${totalPrice}`} VND</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

export default CartItem;
