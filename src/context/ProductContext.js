import React, { createContext, useState, useEffect } from 'react';

// Create context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // Product state
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const phoneResponse = await fetch('http://localhost:8000/phone/general_info/');
        const laptopResponse = await fetch('http://localhost:8000/laptop/general_info/');
        
        if (phoneResponse.ok && laptopResponse.ok) {
          const phoneData = await phoneResponse.json();
          const laptopData = await laptopResponse.json();
          
          const phoneDataWithType = phoneData.map(item => ({ ...item, category: 'phone' }));
          const laptopDataWithType = laptopData.map(item => ({ ...item, category: 'laptop' }));
          
          const combinedData = phoneDataWithType.concat(laptopDataWithType);
          
          setProducts(combinedData);
        } else {
          console.error('Failed to fetch products:', phoneResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
