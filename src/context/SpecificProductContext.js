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
        console.log('000000000000000000000000000')
        const phoneResponse = await fetch('http://localhost:8000/phone/specific_data/');
        const laptopResponse = await fetch('http://localhost:8000/laptop/specific_data/');
        console.log(111111111111111111111111)
        if (phoneResponse.ok && laptopResponse.ok) {
          const phoneData = await phoneResponse.json();
          const laptopData = await laptopResponse.json();
          console.log(2222222222222222222222)
          
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
