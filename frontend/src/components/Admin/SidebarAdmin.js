import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiClipboard, FiUsers } from 'react-icons/fi';

class AdminSidebar extends Component {
  render() {
    return (
      <div className="fixed top-0 left-0 bg-gray-800 text-white md:w-64 w-full h-full md:overflow-y-auto flex flex-col">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <div className="flex-grow p-4">
          <ul>
            <li>
              <Link to="/admin/" className="flex items-center py-2 text-gray-300 hover:text-white">
                <FiHome className="mr-2 text-xl" />
                <span className="text-lg">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center py-2 text-gray-300 hover:text-white">
                <FiShoppingBag className="mr-2 text-xl" />
                <span className="text-lg">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="flex items-center py-2 text-gray-300 hover:text-white">
                <FiClipboard className="mr-2 text-xl" />
                <span className="text-lg">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center py-2 text-gray-300 hover:text-white">
                <FiUsers className="mr-2 text-xl" />
                <span className="text-lg">Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AdminSidebar;
