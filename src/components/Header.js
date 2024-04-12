import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext } from '../context/CartContext';
import { MdOutlineShoppingCart, MdOutlineAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import Menu from './menu/menu'
import { AuthContext } from '../context/AuthContext'; 
const Header = () => {
  const [isActive, setisActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, setisOpen } = useContext(SidebarContext);
  const { isLoggedIn, user } = useContext(AuthContext);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    window.location.href = '/';
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
          <div className="relative cursor-pointer flex items-center ml-4 md:ml-6" onClick={toggleDropdown}>
            <MdOutlineAccountCircle className='text-xl text-gray-800' />
            {isLoggedIn && <span className="ml-2">{user.account}</span>} {/* Render the username next to the account icon if logged in */}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Thông tin cá nhân</Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Đăng xuất</button>
                </div>
              </div>
            )}
          </div>
          {/* Cart */}
          <div onClick={() => setisOpen(!isOpen)} className="cursor-pointer flex items-center ml-6">
            <MdOutlineShoppingCart className='text-xl text-gray-800' />
            <div className='bg-red-500 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-1'>
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
      <Menu className = 'py-2'/>
    </header>
  )
}

export default Header;
