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
import { AuthProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          <AuthProvider>
            <App />
          </AuthProvider>
        </React.StrictMode>    
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>

);