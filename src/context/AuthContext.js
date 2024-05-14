// AuthProvider.js
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
      const response = await axios.get('http://localhost:8000/user/account', {
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
          logout(); // Log out the user if token is invalid
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

  const login = async (account, password) => {
    try {
      const response = await axios.post(process.env.API_URL+"/user/login", {
        account,
        password,
      });
      if (response.status === 200) {
        console.log("Login successful");
        const { token } = response.data;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        fetchUserData(token);
        window.location.replace("/");
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 401 && error.response.data === "Invalid credentials") {
        console.log("Unauthorized: Incorrect credentials");
        return "Tài khoản hoặc mất khẩu không đúng";
      } else if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản hoặc mất khẩu không đúng";
      } else {
        console.error("Error during login:", error);
        // Handle other errors (e.g., network issues)
        return "Có lỗi xảy ra khi đăng nhập";
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser('');
  };

  const register = async (account, email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/user/register", {
        account,
        password,
        email
      });
      if (response.status === 200) {
        const data = response.data;
        if (data === "exist") {
          return "Tài khoản đã tồn tại";
        } else if (data === "notexist") {
          alert("Đăng ký thành công")
          window.location.replace("/");
          return null;
          
        } else {
          return "Unexpected response from server";
        }
      } else {
        console.log("Unexpected response status: " + response.status);
        return "Unexpected response from server";
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      return "An error occurred while registering";
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
