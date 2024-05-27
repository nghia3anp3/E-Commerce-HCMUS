import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  // Order state
  const [orders, setOrders] = useState([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch('http://localhost:8000/api/orders/');
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();   
          setOrders(orderData);
        } else {
          console.error('Failed to fetch orders:', orderResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to delete an order by ID
  const deleteOrder = async (order_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${order_id}`);
      setOrders(orders.filter(order => order.order_id !== order_id));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert("Error deleting order");
    }
  };

  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/orders`, newOrder);
      setOrders([...orders, response.data]);
    } catch (error) {
      console.error('Error adding order:', error);
      alert("Error adding order");
    }
  };

  const updateOrder = async (order_id, updatedOrder) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/orders/${order_id}`, updatedOrder);
      setOrders(orders.map(order => (order.order_id === order_id ? response.data : order)));
    } catch (error) {
      console.error('Error updating order:', error);
      alert("Error updating order");
    }
  };

  // Function to find order by ID
  const findOrderById = (order_id) => {
    return orders.find(order => order.order_id === order_id);
  };

  return (
    <OrderContext.Provider value={{ orders, findOrderById, deleteOrder, addOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
