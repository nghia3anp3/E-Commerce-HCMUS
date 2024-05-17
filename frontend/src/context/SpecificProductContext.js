import React, { createContext, useState, useEffect } from 'react';

// Create context
export const SpecificProductContext = createContext();

const SpecificProductProvider = ({ children }) => {
  // Product state
  const [specificProducts, setSpecificProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const phoneResponse = await fetch('https://e-commerce-hcmus-chi.vercel.app/phone/specific_data/');
        const laptopResponse = await fetch('https://e-commerce-hcmus-chi.vercel.app/laptop/specific_data/');
        if (phoneResponse.ok && laptopResponse.ok) {
          const phoneData = await phoneResponse.json();
          const laptopData = await laptopResponse.json();
          
          const phoneDataWithType = phoneData.map(item => ({ ...item, category: 'phone' }));
          const laptopDataWithType = laptopData.map(item => ({ ...item, category: 'laptop' }));
          
          const combinedData = phoneDataWithType.concat(laptopDataWithType);
          
          setSpecificProducts(combinedData);
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
    <SpecificProductContext.Provider value={{ specificProducts }}>
      {children}
    </SpecificProductContext.Provider>
  );
};

export default SpecificProductProvider;
