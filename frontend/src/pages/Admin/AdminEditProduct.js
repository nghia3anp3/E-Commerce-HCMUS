import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext'; // Import the ProductContext

const AdminEditProduct = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const { getProductById } = useContext(ProductContext); // Consume the ProductContext

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Fetch product details from ProductContext using the id
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        setName(fetchedProduct.name);
        setPrice(fetchedProduct.price);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductById, id]); // Fetch product details when getProductById or id changes

  const handleSubmit = async e => {
    e.preventDefault();
    // Submit the updated product details to the API
    try {
      // Your update logic here
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
