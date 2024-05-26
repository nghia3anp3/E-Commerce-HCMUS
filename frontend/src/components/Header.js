import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import Menu from './menu/menu';
import { MdOutlineShoppingCart, MdOutlineAccountCircle } from 'react-icons/md';
import { SidebarContext } from '../context/SidebarContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isDropdownOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { isActive } = this.state;
    window.scrollY > 60 ? this.setState({ isActive: true }) : this.setState({ isActive: false });
  };


  toggleDropdown = () => {
    this.setState((prevState) => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  };

  handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  render() {
    const { isActive, isDropdownOpen} = this.state;

    return (
      <SidebarContext.Consumer>
        {(sidebarContext) => (
          <CartContext.Consumer>
            {(cartContext) => (
              <AuthContext.Consumer>
                {(authContext) => (
                  <header className={`fixed w-full z-10 transition-all ${isActive ? 'bg-white' : 'bg-white shadow-md'}`}>
                    <div className='container mx-auto py-4 px-4 flex items-center justify-between' style={{ padding: '2em' }}>
                      {/* Logo */}
                      <Link to={'/'}>
                        <img className='w-16 h-auto' src={Logo} alt="Logo" />
                      </Link>
                      {/* Search bar */}
                      <SearchBar/>
                      {/* Navigation */}
                      <nav className="hidden md:flex space-x-4">
                        <Link to={'/'} className="text-gray-800 hover:text-gray-600">Trang chủ</Link>
                        <Link to={'/about'} className="text-gray-800 hover:text-gray-600">Thông tin</Link>
                        <Link to={'/services'} className="text-gray-800 hover:text-gray-600">Dịch vụ</Link>
                        <Link to={'/contact'} className="text-gray-800 hover:text-gray-600">Liên hệ</Link>
                      </nav>
                      <div className="flex items-center">
                        {/* Account */}
                        <div className="relative cursor-pointer flex items-center ml-4 md:ml-6" onClick={this.toggleDropdown}>
                          {authContext.isLoggedIn ? (
                            // Nếu đã đăng nhập, hiển thị thông tin tài khoản và dropdown menu
                            <>
                              <MdOutlineAccountCircle className='text-xl text-gray-800' />
                              <span className="ml-2">{authContext.user.account}</span>
                              {isDropdownOpen && (
                                <div className="absolute top-12 right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Thông tin cá nhân</Link>
                                    <button onClick={this.handleLogout} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Đăng xuất</button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập khi click vào icon Account
                            <Link to="/login">
                              <MdOutlineAccountCircle className='text-xl text-gray-800' />
                            </Link>
                          )}
                        </div>

                        {/* Cart */}
                        <div onClick={() => sidebarContext.setisOpen(!sidebarContext.isOpen)} className="cursor-pointer flex items-center ml-6">
                          <MdOutlineShoppingCart className='text-xl text-gray-800' />
                          <div className='bg-red-500 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-1'>
                            {cartContext.itemAmount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Menu className='py-2' />
                  </header>
                )}
              </AuthContext.Consumer>
            )}
          </CartContext.Consumer>
        )}
      </SidebarContext.Consumer>
    );
  }
}

export default Header;
