import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext } from '../context/CartContext';

class Sidebar extends Component {


  render() {
    return (
      <SidebarContext.Consumer>
        {(sidebarContext) => (
          <CartContext.Consumer>
            {(cartContext) => (
              <div className={`${sidebarContext.isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
                <div className='flex items-center justify-between py-6 border-b'>
                  <div className='uppercase text-sm font-semibold'>Giỏ hàng ({cartContext.itemAmount})</div>
                  {/* icon */}
                  <div onClick={sidebarContext.handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
                    <IoMdArrowForward className='text-2xl' />
                  </div>
                </div>
                <div className='flex flex-col gap-y-2 h-[520px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b'>
                  {cartContext.cart.map((item) => (
                    <CartItem item={item} key={item.product_id} images = {item.images} />
                  ))}
                </div>
                <div className='flex flex-col gap-y-3 py-4 mt-4'>
                  <div className='flex w-full justify-between items-center'>
                    {/* total */}
                    <div className='uppercase text font-semibold'>
                      <span>Tổng cộng: </span> {parseFloat(cartContext.total).toFixed(2)} VND
                    </div>
                    {/* clear cart icon */}
                    <div onClick={cartContext.clearCart} className='cursor-pointer py-4 bg-red-500 text white w-12 h-12 flex justify-center items-center text-xl'>
                      <FiTrash2 />
                    </div>
                  </div>
                  <Link to='/checkout' className='bg-stone-950 flex p-6 justify-center items-center text-white w-full font-medium'>Thanh toán</Link>
                </div>
              </div>
            )}
          </CartContext.Consumer>
        )}
      </SidebarContext.Consumer>
    );
  }
}

export default Sidebar;
