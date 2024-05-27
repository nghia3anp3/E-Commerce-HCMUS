import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User state
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Add user
  const addUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/', newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  // Update user
  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${userId}`, updatedData);
      setUsers(users.map(user => (user.user_id === userId ? response.data : user)));
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  // Find user by ID
  const findUserById = (userId) => {
    return users.find(user => user.user_id === userId);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, findUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
