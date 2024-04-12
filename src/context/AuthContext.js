import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/account', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        console.log("User data fetched successfully");
        setUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: Invalid token");
          // Handle unauthorized access due to invalid token
        } else if (error.response.status === 403) {
          console.log("Forbidden: Access denied");
          // Handle access denied due to insufficient permissions
        } else if (error.response.status === 404) {
          console.log("User not found");
          // Handle user not found
        } else {
          console.error("Error fetching user data:", error);
          // Handle other errors (e.g., network issues)
        }
      } else {
        console.error("Error fetching user data:", error);
        // Handle other errors (e.g., network issues)
      }
    }
  };
  

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
