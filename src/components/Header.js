import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext } from '../context/CartContext';
import { MdOutlineShoppingCart, MdOutlineAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';

const Header = () => {
  const [isActive, setisActive] = useState(false);
  const { isOpen, setisOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setisActive(true) : setisActive(false);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className={`fixed w-full z-10 transition-all ${isActive ? 'bg-white' : 'bg-white shadow-md'}`}>
      <div className='container mx-auto py-4 px-4 flex items-center justify-between' style={{ padding: '2em' }}>
        {/* Logo */}
        <Link to={'/'}>
          <img className='w-16 h-auto' src={Logo} alt="Logo" />
        </Link>
        {/* Search bar */}
        <form onSubmit={handleSearch} className="ml-6 md:ml-0 flex-grow max-w-md">
          <input 
            type="text" 
            placeholder=" Tìm kiếm..." 
            className="px- py-2 rounded-lg border-gray-300 border focus:outline-none focus:border-gray-400 mr-2 flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-stone-950 text-white py-2 px-4 rounded-lg">Tìm kiếm</button>
        </form>
        {/* Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to={'/'} className="text-gray-800 hover:text-gray-600">Trang chủ</Link>
          <Link to={'/about'} className="text-gray-800 hover:text-gray-600">Thông tin</Link>
          <Link to={'/services'} className="text-gray-800 hover:text-gray-600">Dịch vụ</Link>
          <Link to={'/contact'} className="text-gray-800 hover:text-gray-600">Liên hệ</Link>
        </nav>
        <div className="flex items-center">
          {/* Account */}
          <Link to={'/account'} className="cursor-pointer flex items-center ml-4 md:ml-6">
            <MdOutlineAccountCircle className='text-xl text-gray-800' />
          </Link>
          {/* Cart */}
          <div onClick={() => setisOpen(!isOpen)} className="cursor-pointer flex items-center ml-6">
            <MdOutlineShoppingCart className='text-xl text-gray-800' />
            <div className='bg-red-500 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-1'>
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
