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
import SpecificProductProvider from './context/SpecificProductContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <SpecificProductProvider>
          <React.StrictMode>
            <AuthProvider>
              <App />
            </AuthProvider>
          </React.StrictMode>    
        </SpecificProductProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>

);