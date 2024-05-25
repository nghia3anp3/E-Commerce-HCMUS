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
        const productResponse = await fetch('http://localhost:8000/api/product/')
        if (productResponse.ok ) {
          const productdata = await productResponse.json();   
          setProducts(productdata);
        } else {
          console.error('Failed to fetch products:', productResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to find product by ID
  const findProductById = (product_id) => {
    return products.find(product => product.product_id === product_id);
  };

  return (
    <ProductContext.Provider value={{ products, findProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
