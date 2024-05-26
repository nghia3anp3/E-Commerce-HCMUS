import React, { useState, useContext } from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';
import { UserContext } from '../../context/UserContext';

const AdminUsers = () => {
  const { users } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter users based on the entered user ID
  const filteredUsers = users.filter(user => {
    if (searchTerm.trim() === '') {
      return true;
    }
    if (!user || !user.user_id) {
      return false;
    }
    return user.user_id.toString().includes(searchTerm);
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < filteredUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-64">
        <h1 className="mb-4 text-2xl font-bold">Admin Users</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by User ID"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Account</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Avatar</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {currentUsers.map(user => (
                <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.user_id}</td>
                  <td className="py-3 px-6 text-left">{user.account}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.address}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-left">
                    <img src={user.avatar} alt={user.account} className="h-10 w-10 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
            onClick={handleNextPage}
            disabled={endIndex >= filteredUsers.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
