import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/SidebarAdmin';
import Table from 'react-bootstrap/Table';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => order.order_id.toString().includes(searchTerm));

  const handleApprove = async (order) => {
    try {
      const updatedOrder = { ...order, status: 'Approved' };
      await axios.put(`http://localhost:8000/api/orders/${order.order_id}`, updatedOrder);
      // Update the order status in the local state
      setOrders(orders.map(o => (o.order_id === updatedOrder.order_id ? updatedOrder : o)));
    } catch (error) {
      console.error('Error approving order:', error);
      setError('Failed to approve order.');
    }
  };

  const handleDecline = async (order) => {
    try {
      const updatedOrder = { ...order, status: 'Declined' };
      await axios.put(`http://localhost:8000/api/orders/${order.order_id}`, updatedOrder);
      // Update the order status in the local state
      setOrders(orders.map(o => (o.order_id === updatedOrder.order_id ? updatedOrder : o)));
    } catch (error) {
      console.error('Error declining order:', error);
      setError('Failed to decline order.');
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-64">
        <h1 className="mb-4 text-2xl font-bold">Admin Orders</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Order ID"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <Table striped bordered hover responsive>
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Product IDs</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.order_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-2">{order.order_id}</td>
                  <td className="px-4 py-2">{order.customer_id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{order.address}</td>
                  <td className="px-4 py-2">{order.detail_product_ids.join(', ')}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    {order.status === 'Pending' && (
                      <div>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                          onClick={() => handleApprove(order)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                          onClick={() => handleDecline(order)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AdminOrders;
