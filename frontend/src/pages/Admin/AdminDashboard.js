import React, { useState, useContext } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FiUser, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Import Context
import { OrderContext } from '../../context/OrderContext';
import { UserContext } from '../../context/UserContext';
import { DetailProductContext } from '../../context/DetailProductContext';
import { ProductContext } from '../../context/ProductContext';

const AdminDashboard = () => {
  const { orders } = useContext(OrderContext);
  const { users } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  const { detailProducts } = useContext(DetailProductContext);

  const [totalOrders, setTotalOrders] = useState(orders.length);
  const [totalUsers, setTotalUsers] = useState(users.length);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(null);

  console.log(totalOrders, totalUsers)

  const getTotalSales = (orders) => {
    let total = 0;
    orders.map((item) => {
      total += parseInt(item.total);
    });
    return total.toLocaleString();
  };

  const getBarChartData = (detailProducts, orders) => {
    // Labels
    let labels = ["May", "June"];
    let phone_quantity = [0, 0];
    let laptop_quantity = [0, 0];
    let phone_sales = [0, 0];
    let laptop_sales = [0, 0];

    orders.forEach((order_item) => {
      let month = parseInt(order_item.date.slice(5, 7));
      detailProducts.forEach((detail_product_item) => {
        if (detail_product_item.type === "phone") {
          if (month === 5) {
            phone_quantity[0] += detail_product_item.quantity;
            phone_sales[0] += detail_product_item.quantity * detail_product_item.price;
          } else {
            phone_quantity[1] += detail_product_item.quantity;
            phone_sales[1] += detail_product_item.quantity * detail_product_item.price;
          }
        } else {
          if (month === 5) {
            laptop_quantity[0] += detail_product_item.quantity;
            laptop_sales[0] += detail_product_item.quantity * detail_product_item.price;
          } else {
            laptop_quantity[1] += detail_product_item.quantity;
            laptop_sales[1] += detail_product_item.quantity * detail_product_item.price;
          }
        }
      });
    });

    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Phone Quantity',
          data: phone_quantity,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Laptop Quantity',
          data: laptop_quantity,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
          label: 'Phone Sales (VNĐ)',
          data: phone_sales,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
          label: 'Laptop Sales (VNĐ)',
          data: laptop_sales,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
        },
      ],
    };
    return barChartData;
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + ' triệu VNĐ';
          },
        },
      },
    },
  };

  const openModal = (content, data) => {
    setModalContent(content);
    setChartData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'Sales Overview Data':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Sales and Quantity Chart</h2>
            {chartData && <Bar data={chartData} options={barChartOptions} />}
          </div>
        );
      case 'Order Statistics Data':
        return <div>{/* Add order statistics data structure here */}</div>;
      case 'User Activities':
        return (
          <div>
            
          </div>
        )
      default:
        return null;
    }
  };

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
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiPieChart className="w-6 h-6" />
                <p>Total Sales: {getTotalSales(orders)} VNĐ</p>
              </div>
              <button onClick={() => openModal('Sales Overview Data', getBarChartData(detailProducts, orders))} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                View Details
              </button>
            </div>
          </div>
          {/* Order Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiBarChart2 className="w-6 h-6" />
                <p>Total Orders: {totalOrders}</p>
              </div>
            </div>
          </div>
          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Total Users</h2>
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiUser className="w-6 h-6" />
                <p>Total Users: {totalUsers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            {renderModalContent()}
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
