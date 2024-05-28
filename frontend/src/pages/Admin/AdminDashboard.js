import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FiUser, FiActivity, FiBell, FiPieChart, FiBarChart2, FiHeart } from 'react-icons/fi';

const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/total-orders');
        if (!response.ok) {
          throw new Error('Failed to fetch total orders');
        }
        const data = await response.json();
        setTotalOrders(data.totalOrders);
        setError(null);
      } catch (error) {
        console.error('Error fetching total orders:', error);
        setError('Failed to fetch total orders');
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/total-users');
        if (!response.ok) {
          throw new Error('Failed to fetch total users');
        }
        const data = await response.json();
        setTotalUsers(data.totalUsers);
        setError(null);
      } catch (error) {
        console.error('Error fetching total users:', error);
        setError('Failed to fetch total users');
      }
    };

    fetchTotalOrders();
    fetchTotalUsers();

    const interval = setInterval(() => {
      fetchTotalOrders();
      fetchTotalUsers();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // const openModal = content => {
  //   setModalContent(content);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setModalContent(null);
  //   setShowModal(false);
  // };

  // const renderModalContent = () => {
  //   switch (modalContent) {
  //     case 'Sales Overview Data':
  //       return (
  //         <div>
  //           {/* Add sales overview data structure here */}
  //         </div>
  //       );
  //     case 'Order Statistics Data':
  //       return (
  //         <div>
  //           {/* Add order statistics data structure here */}
  //         </div>
  //       );
  //     case 'User Activities':
  //       return (
  //         <div>
  //           {/* Add user activities data structure here */}
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow ml-64 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiPieChart className="w-6 h-6" />
                <p>Total Sales: $10,000</p> 
              </div>
              {/* <button onClick={() => openModal('Sales Overview Data')} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                View Details
              </button> */}
            </div>
          </div>
          {/* Order Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiBarChart2 className="w-6 h-6" />
                <p>Total Orders: {totalOrders}</p>
              </div>
              {/* <button onClick={() => openModal('Order Statistics Data')} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                View Details
              </button> */}
            </div>
          </div>
          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Total Users</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiUser className="w-6 h-6" />
                <p>Total Users: {totalUsers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            {
            renderModalContent()}
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AdminDashboard;
