import React, { useState, useContext } from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';
import { UserContext } from '../../context/UserContext';

const AdminUsers = () => {
  const { users, deleteUser, updateUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    account: '',
    role: '',
    email: '',
    address: '',
    phone: '',
  });

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

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      account: user.account,
      role: user.role,
      email: user.email,
      address: user.address,
      phone: user.phone,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (user_id) => {
    deleteUser(user_id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editingUser.user_id, formData);
    setIsModalOpen(false);
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
                {/* <th className="py-3 px-6 text-left">Avatar</th> */}
                <th className="py-3 px-6 text-left">Actions</th>
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
                  {/* <td className="py-3 px-6 text-left">
                    <img src={user.avatar} alt={user.account} className="h-10 w-10 rounded-full" />
                  </td> */}
                  <td className="py-3 px-6 text-left">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Account</label>
                <input
                  type="text"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block mb-1">Avatar</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div> */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
