import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';

const AdminEditProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = parseInt(queryParams.get('product_id'));
  const { findProductById} = useContext(ProductContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sku: '',
    short_description: '',
    price: '',
    original_price: '',
    discount: '',
    discount_rate: '',
    quantity_sold: '',
    review_count: '',
    inventory_status: '',
    stock_item_qty: '',
    stock_item_max_sale_qty: '',
    brand_id: '',
    brand_name: '',
    images: [],
    comments_id: [],
    specific_infos: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = findProductById(product_id);
        setProduct(fetchedProduct);
        setFormData({
          name: fetchedProduct.name,
          type: fetchedProduct.type,
          sku: fetchedProduct.sku.toString(),
          short_description: fetchedProduct.short_description,
          price: fetchedProduct.price.toString(),
          original_price: fetchedProduct.original_price.toString(),
          discount: fetchedProduct.discount.toString(),
          discount_rate: fetchedProduct.discount_rate.toString(),
          quantity_sold: fetchedProduct.quantity_sold,
          review_count: fetchedProduct.review_count.toString(),
          inventory_status: fetchedProduct.inventory_status,
          stock_item_qty: fetchedProduct.stock_item_qty.toString(),
          stock_item_max_sale_qty: fetchedProduct.stock_item_max_sale_qty.toString(),
          brand_id: fetchedProduct.brand_id.toString(),
          brand_name: fetchedProduct.brand_name,
          images: fetchedProduct.images,
          comments_id: fetchedProduct.comments_id,
          specific_infos: fetchedProduct.specific_infos,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

  }, [findProductById, product_id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Prepare updated product data
      const updatedProduct = {
        ...product,
        ...formData,
        sku: parseInt(formData.sku),
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price),
        discount: parseFloat(formData.discount),
        discount_rate: parseFloat(formData.discount_rate),
        review_count: parseInt(formData.review_count),
        stock_item_qty: parseInt(formData.stock_item_qty),
        stock_item_max_sale_qty: parseInt(formData.stock_item_max_sale_qty),
        brand_id: parseInt(formData.brand_id),
      };

      // Make API call to update the product
      await axios.post(`http://localhost:8000/api/product/${product_id}`, {
        updatedProduct
      });

      // Optionally, you can redirect the user to another page after successful update

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for each attribute */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="short_description">Short Description:</label>
          <textarea
            id="short_description"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="original_price">Original Price:</label>
          <input
            type="text"
            id="original_price"
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discount_rate">Discount Rate:</label>
          <input
            type="text"
            id="discount_rate"
            name="discount_rate"
            value={formData.discount_rate}
            onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="quantity_sold">Quantity Sold:</label>
              <textarea
                type="text"
                id="quantity_sold"
                name="quantity_sold"
                value={formData.quantity_sold}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="review_count">Review Count:</label>
              <input
                type="text"
                id="review_count"
                name="review_count"
                value={formData.review_count}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="inventory_status">Inventory Status:</label>
              <input
                type="text"
                id="inventory_status"
                name="inventory_status"
                value={formData.inventory_status}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="stock_item_qty">Stock Item Quantity:</label>
              <input
                type="text"
                id="stock_item_qty"
                name="stock_item_qty"
                value={formData.stock_item_qty}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="stock_item_max_sale_qty">Stock Item Max Sale Quantity:</label>
              <input
                type="text"
                id="stock_item_max_sale_qty"
                name="stock_item_max_sale_qty"
                value={formData.stock_item_max_sale_qty}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="brand_id">Brand ID:</label>
              <input
                type="text"
                id="brand_id"
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="brand_name">Brand Name:</label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="images">Images:</label>
              <textarea
                type="text"
                id="images"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="comments_id">Comments ID:</label>
              <textarea
                type="text"
                id="comments_id"
                name="comments_id"
                value={formData.comments_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="specific_infos">Specific Infos:</label>
              <textarea
                type="text"
                id="specific_infos"
                name="specific_infos"
                value={formData.specific_infos}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      );
    };
    
    export default AdminEditProduct;