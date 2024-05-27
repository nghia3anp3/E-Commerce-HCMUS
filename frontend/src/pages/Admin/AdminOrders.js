import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';
import Table from 'react-bootstrap/Table';
import { OrderContext } from '../../context/OrderContext';
import { DetailProductContext } from '../../context/DetailProductContext';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { orders, updateOrder } = useContext(OrderContext);
  const { detailProducts } = useContext(DetailProductContext);
  console.log(detailProducts)
  const filteredOrders = orders.filter(order => order.order_id.toString().includes(searchTerm));

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleSublist = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  const handleApprove = async (order) => {
    try {
      const updatedOrder = { ...order, status: 'Approved' };
      updateOrder(order.order_id, updatedOrder)
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error approving order:', error);
      setError('Failed to approve order.');
    }
  };

  const handleDecline = async (order) => {
    try {
      const updatedOrder = { ...order, status: 'Declined' };
      updateOrder(order.order_id, updatedOrder)
      // Reload the page
      window.location.reload();
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
                <React.Fragment key={order.order_id}>
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleSublist(order.order_id)}
                  >
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
                  {expandedOrderId === order.order_id && (
                    <tr>
                      <td colSpan="7">
                      <div className="bg-gray-100 p-4">
                          <h2 className="text-lg font-bold mb-2">Order Details</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {detailProducts.filter(detailProduct => detailProduct.order_id === order.order_id)
                              .map(detailProduct => (
                                <div key={detailProduct.detail_product_id} className="p-4 bg-white rounded shadow">
                                  <p><strong>Detail Product ID:</strong> {detailProduct.detail_product_id}</p>
                                  <p><strong>Order ID:</strong> {detailProduct.order_id}</p>
                                  <p><strong>Product ID:</strong> {detailProduct.product_id}</p>
                                  <p><strong>Type:</strong> {detailProduct.type}</p>
                                  <p><strong>Quantity:</strong> {detailProduct.quantity}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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