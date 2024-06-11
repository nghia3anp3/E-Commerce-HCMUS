import React, { Component } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Table from 'react-bootstrap/Table';
import { OrderContext } from '../../context/OrderContext';
import { DetailProductContext } from '../../context/DetailProductContext';
import { ProductContext } from '../../context/ProductContext';

class AdminOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      error: null,
      expandedOrderId: null
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  toggleSublist = (orderId) => {
    this.setState((prevState) => ({
      expandedOrderId: prevState.expandedOrderId === orderId ? null : orderId
    }));
  };

  handleApprove = async (order, updateOrder) => {
    try {
      const updatedOrder = { ...order, status: 'Approved' };
      await updateOrder(order.order_id, updatedOrder);
      window.location.reload();
    } catch (error) {
      console.error('Error approving order:', error);
      this.setState({ error: 'Failed to approve order.' });
    }
  };

  handleDecline = async (order, updateOrder) => {
    try {
      const updatedOrder = { ...order, status: 'Declined' };
      await updateOrder(order.order_id, updatedOrder);
      window.location.reload();
    } catch (error) {
      console.error('Error declining order:', error);
      this.setState({ error: 'Failed to decline order.' });
    }
  };

  render() {
    return (
      <OrderContext.Consumer>
        {(orderContext) => (
          <DetailProductContext.Consumer>
            {(detailProductContext) => (
              <ProductContext.Consumer>
                {(productContext) => {
                  const { orders, updateOrder } = orderContext;
                  const { detailProducts } = detailProductContext;
                  const { products } = productContext;
                  const { searchTerm, error, expandedOrderId } = this.state;

                  const filteredOrders = orders.filter(order => order.order_id.toString().includes(searchTerm));

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
                            onChange={this.handleSearchChange}
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
                                    onClick={() => this.toggleSublist(order.order_id)}
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
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              this.handleApprove(order, updateOrder);
                                            }}
                                          >
                                            Approve
                                          </button>
                                          <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              this.handleDecline(order, updateOrder);
                                            }}
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
                                              .map(detailProduct => {
                                                const product = products.find(p => p.product_id === detailProduct.product_id);
                                                return (
                                                  <div key={detailProduct.detail_product_id} className="p-4 bg-white rounded shadow">
                                                    <p><strong>Detail Product ID:</strong> {detailProduct.detail_product_id}</p>
                                                    <p><strong>Order ID:</strong> {detailProduct.order_id}</p>
                                                    <p><strong>Product ID:</strong> {detailProduct.product_id}</p>
                                                    <p><strong>Product Name:</strong> {product ? product.name : 'N/A'}</p>
                                                    <p><strong>Type:</strong> {detailProduct.type}</p>
                                                    <p><strong>Quantity:</strong> {detailProduct.quantity}</p>
                                                  </div>
                                                );
                                              })}
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
                }}
              </ProductContext.Consumer>
            )}
          </DetailProductContext.Consumer>
        )}
      </OrderContext.Consumer>
    );
  }
}

export default AdminOrders;
