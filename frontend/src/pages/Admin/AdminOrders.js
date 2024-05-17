import React, { Component } from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';

class AdminOrders extends Component {
  render() {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <h1 className="pl-4">Admin Orders</h1>
          {/* Add your orders management content here */}
        </div>
      </div>
    );
  }
}

export default AdminOrders;
