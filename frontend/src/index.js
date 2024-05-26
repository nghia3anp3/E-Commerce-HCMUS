import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tailwindcss/tailwind.css'
//product provider
import ProductProvider from './context/ProductContext';
//sidebar provider
import SidebarProvider from './context/SidebarContext';
//cart provider
import CartProvider from './context/CartContext';
import CommentProvider from './context/CommentContext';
import SubCommentProvider from './context/SubCommentContext';
import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
          <CommentProvider>
          <SubCommentProvider>
          <UserProvider>
          <React.StrictMode>
            <AuthProvider>
              <App />
            </AuthProvider>
          </React.StrictMode>
          </UserProvider>
          </SubCommentProvider>
          </CommentProvider>    
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>

);