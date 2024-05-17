import React from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow">
        {/* Add your dashboard content here */}
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
