import React, { useContext } from 'react'
//import Link
import { Link } from 'react-router-dom'
//import icons
import { IoMdArrowForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'
//import components
import CartItem from '../components/CartItem'
// import sidebar context
import { SidebarContext  } from '../context/SidebarContext'
// import cart context
import { CartContext } from '../context/CartContext'

const Sidebar = () => {
  const { isOpen, handleClose} = useContext(SidebarContext)
  const {cart, clearCart, itemAmount, total} = useContext(CartContext)
  return (
    <div className={`${
      isOpen ? 'right-0' : '-right-full'
    } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] 
    xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Giỏ hàng ({itemAmount})</div>
        {/* icon */}
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[520px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => {
        return <CartItem item={item} key={item.id}/>
        })}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          {/* total */}
          <div className='uppercase text font-semibold'>
            <span>Tổng cộng: </span> $ {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500 text white w-12 h-12 flex justify-center items-center  text-xl'>
            <FiTrash2 />
          </div>
        </div>
        <Link to='/' className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium'>Xem giỏ hàng</Link>
        <Link to='/' className='bg-stone-950 flex p-4 justify-center items-center text-white w-full font-medium'>Thanh toán</Link>
      </div>
    </div>
  )
}

export default Sidebar