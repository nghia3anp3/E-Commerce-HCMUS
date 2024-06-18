import React, { Component } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

class AdminUsers extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      currentPage: 1,
      isModalOpen: false,
      editingUser: null,
      formData: {
        account: '',
        role: '',
        email: '',
        address: '',
        phone: '',
      },
      isDeleteModalOpen: false,
      userToDelete: null,
    };
  }

  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  handleNextPage = () => {
    const { users } = this.context;
    const { currentPage } = this.state;
    const endIndex = currentPage * 10;
    if (endIndex < users.length) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  handleEdit = (user) => {
    const { account, role, email, address, phone } = user;
    this.setState({
      editingUser: user,
      formData: { account, role, email, address, phone },
      isModalOpen: true,
    });
  };

  handleDeleteConfirmation = (user) => {
    this.setState({ userToDelete: user, isDeleteModalOpen: true });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateUser } = this.context;
    const { editingUser, formData } = this.state;
    const updatedUser = { ...editingUser, ...formData };
    updateUser(editingUser.user_id, updatedUser);
    this.setState({ isModalOpen: false });
    window.location.reload(); // This is not ideal, consider a better way to handle updates
  };

  handleDelete = (user_id) => {
    const { deleteUser } = this.context;
    deleteUser(user_id);
    this.setState({ isDeleteModalOpen: false });
  };

  render() {
    const { users } = this.context;
    const {
      searchTerm,
      currentPage,
      isModalOpen,
      editingUser,
      formData,
      isDeleteModalOpen,
      userToDelete,
    } = this.state;

    // Filter users based on the entered user ID
    const filteredUsers = users.filter((user) => {
      if (searchTerm.trim() === '') {
        return true;
      }
      if (!user || !user.user_id) {
        return false;
      }
      return user.user_id.toString().includes(searchTerm);
    });

    // Pagination logic
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => {
          if (!isLoggedIn) {
            return <div>You are not logged in</div>;
          }
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
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
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
                        <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      {currentUsers.map((user) => (
                        <tr
                          key={user.user_id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{user.user_id}</td>
                          <td className="py-3 px-6 text-left">{user.account}</td>
                          <td className="py-3 px-6 text-left">{user.role}</td>
                          <td className="py-3 px-6 text-left">{user.email}</td>
                          <td className="py-3 px-6 text-left">{user.address}</td>
                          <td className="py-3 px-6 text-left">{user.phone}</td>
                          <td className="py-3 px-6 text-left">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                              onClick={() => this.handleEdit(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-md"
                              onClick={() => this.handleDeleteConfirmation(user)}
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
                    onClick={this.handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-md"
                    onClick={this.handleNextPage}
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
                    <form onSubmit={this.handleSubmit}>
                      <div className="mb-4">
                        <label className="block mb-1">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
                          className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={this.handleChange}
                          className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={this.handleChange}
                          className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => this.setState({ isModalOpen: false })}
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

              {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl mb-4">Confirm</h2>
                    <p>Do you want to delete this user? {userToDelete?.account}?</p>
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => this.setState({ isDeleteModalOpen: false })}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => this.handleDelete(userToDelete.user_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default AdminUsers;
