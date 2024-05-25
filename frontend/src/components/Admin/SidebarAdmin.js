import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiClipboard } from 'react-icons/fi';

class AdminSidebar extends Component {
  render() {
    return (
      <div className="fixed top-0 left-0 bg-gray-800 text-white md:w-64 w-full h-full md:overflow-y-auto flex flex-col">
        <div className="p-4 text-xl">Admin Panel</div>
        <div className="flex-grow p-4">
          <ul>
            <li>
              <Link to="/admin/" className="flex items-center py-2 text-gray-400 hover:text-white">
                <FiHome className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center py-2 text-gray-400 hover:text-white">
                <FiShoppingBag className="mr-2" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="flex items-center py-2 text-gray-400 hover:text-white">
                <FiClipboard className="mr-2" />
                Orders
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
    );
  }
}

export default AdminSidebar;
