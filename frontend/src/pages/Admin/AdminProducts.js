import React, { useState, useEffect, useContext, useMemo, Component } from 'react';
import { useTable, usePagination } from 'react-table';
import { ProductContext } from '../../context/ProductContext';
import AdminSidebar from '../../components/AdminSidebar';

class AdminAddProduct extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        product_id: '',
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
        images: '',
        comments_id: '',
        specific_infos: '',
      },
      error: '',
    };
  }

  handleChange = (e) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;
    try {
      const newProduct = {
        ...formData,
        product_id: parseInt(formData.product_id),
        sku: parseInt(formData.sku),
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price),
        discount: parseFloat(formData.discount),
        discount_rate: parseFloat(formData.discount_rate),
        quantity_sold: parseInt(formData.quantity_sold),
        review_count: parseInt(formData.review_count),
        stock_item_qty: parseInt(formData.stock_item_qty),
        stock_item_max_sale_qty: parseInt(formData.stock_item_max_sale_qty),
        brand_id: parseInt(formData.brand_id),
      };
      this.context.addProduct(newProduct);
      this.props.onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      this.setState({ error: 'Failed to add product.' });
    }
  };

  render() {
    const { formData, error } = this.state;
    const { onClose } = this.props;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-sm md:max-w-md lg:max-w-3xl flex">
          <div className="flex flex-col w-full">
            {/* Modal content */}
          <div className="w-full flex flex-wrap">
          <div className="w-1/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form>
              {/* Input fields for each attribute */}
              <div>
                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Product ID:</label>
                <input
                  type="text"
                  id="product_id"
                  name="product_id"
                  value={formData.product_id}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU:</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">Short Description:</label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">Original Price:</label>
                <input
                  type="text"
                  id="original_price"
                  name="original_price"
                  value={formData.original_price}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount:</label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </form>
          </div>
          <div className="w-1/3 px-4">
            {/* Second column */}
            <div>
              <label htmlFor="discount_rate" className="block text-sm font-medium text-gray-700">Discount Rate:</label>
              <input
                type="text"
                id="discount_rate"
                name="discount_rate"
                value={formData.discount_rate}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="quantity_sold" className="block text-sm font-medium text-gray-700">Quantity Sold:</label>
              <input
                type="text"
                id="quantity_sold"
                name="quantity_sold"
                value={formData.quantity_sold}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="review_count" className="block text-sm font-medium text-gray-700">Review Count:</label>
              <input
                type="text"
                id="review_count"
                name="review_count"
                value={formData.review_count}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="inventory_status" className="block text-sm font-medium text-gray-700">Inventory Status:</label>
              <input
                type="text"
                id="inventory_status"
                name="inventory_status"
                value={formData.inventory_status}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="stock_item_qty" className="block text-sm font-medium text-gray-700">Stock Item Quantity:</label>
              <input
                type="text"
                id="stock_item_qty"
                name="stock_item_qty"
                value={formData.stock_item_qty}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="stock_item_max_sale_qty" className="block text-sm font-medium text-gray-700">Stock Item Max Sale Quantity:</label>
              <input
                type="text"
                id="stock_item_max_sale_qty"
                name="stock_item_max_sale_qty"
                value={formData.stock_item_max_sale_qty}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">Brand ID:</label>
              <input
                type="text"
                id="brand_id"
                name="brand_id"
                value={formData.brand_id}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="w-1/3 pl-4">
            {/* Third column */}
            <div>
              <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700">Brand Name:</label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={formData.brand_name}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
              <textarea
                id="images"
                name="images"
                value={formData.images}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="comments_id" className="block text-sm font-medium text-gray-700">Comments ID:</label>
              <textarea
                id="comments_id"
                name="comments_id"
                value={formData.comments_id}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="specific_infos" className="block text-sm font-medium text-gray-700">Specific Infos:</label>
              <textarea
                id="specific_infos"
                name="specific_infos"
                value={formData.specific_infos}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 w-full">
          <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button type="button" onClick={this.handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add Product
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }
}



// AdminEditProduct component as a modal
class AdminEditProduct extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      formData: {
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
      },
      error: '',
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { product_id } = this.props;
    const { findProductById } = this.context;
    try {
      const fetchedProduct = findProductById(product_id);
      this.setState({
        product: fetchedProduct,
        formData: {
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
        },
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      this.setState({ error: 'Failed to fetch product details.', loading: false });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { updateProduct } = this.context;
    const { product_id, onClose } = this.props;
    const { formData, product } = this.state;
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
      updateProduct(product_id, updatedProduct);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      this.setState({ error: 'Failed to update product.' });
    }
  };

  handleChange = (e) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { onClose } = this.props;
    const { loading, formData, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-sm md:max-w-md lg:max-w-3xl flex">
          <div className="flex flex-col w-full">
            {/* Modal content */}
          <div className="w-full flex flex-wrap">
          <div className="w-1/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form>
              {/* Input fields for each attribute */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU:</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">Short Description:</label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">Original Price:</label>
                <input
                  type="text"
                  id="original_price"
                  name="original_price"
                  value={formData.original_price}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount:</label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={this.handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </form>
          </div>
          <div className="w-1/3 px-4">
            {/* Second column */}
            <div>
              <label htmlFor="discount_rate" className="block text-sm font-medium text-gray-700">Discount Rate:</label>
              <input
                type="text"
                id="discount_rate"
                name="discount_rate"
                value={formData.discount_rate}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="quantity_sold" className="block text-sm font-medium text-gray-700">Quantity Sold:</label>
              <input
                type="text"
                id="quantity_sold"
                name="quantity_sold"
                value={formData.quantity_sold}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="review_count" className="block text-sm font-medium text-gray-700">Review Count:</label>
              <input
                type="text"
                id="review_count"
                name="review_count"
                value={formData.review_count}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="inventory_status" className="block text-sm font-medium text-gray-700">Inventory Status:</label>
              <input
                type="text"
                id="inventory_status"
                name="inventory_status"
                value={formData.inventory_status}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="stock_item_qty" className="block text-sm font-medium text-gray-700">Stock Item Quantity:</label>
              <input
                type="text"
                id="stock_item_qty"
                name="stock_item_qty"
                value={formData.stock_item_qty}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="stock_item_max_sale_qty" className="block text-sm font-medium text-gray-700">Stock Item Max Sale Quantity:</label>
              <input
                type="text"
                id="stock_item_max_sale_qty"
                name="stock_item_max_sale_qty"
                value={formData.stock_item_max_sale_qty}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">Brand ID:</label>
              <input
                type="text"
                id="brand_id"
                name="brand_id"
                value={formData.brand_id}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="w-1/3 pl-4">
            {/* Third column */}
            <div>
              <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700">Brand Name:</label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={formData.brand_name}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
              <textarea
                id="images"
                name="images"
                value={formData.images}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="comments_id" className="block text-sm font-medium text-gray-700">Comments ID:</label>
              <textarea
                id="comments_id"
                name="comments_id"
                value={formData.comments_id}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="specific_infos" className="block text-sm font-medium text-gray-700">Specific Infos:</label>
              <textarea
                id="specific_infos"
                name="specific_infos"
                value={formData.specific_infos}
                onChange={this.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 w-full">
          <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button type="button" onClick={this.handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
// AdminProducts component
class AdminProducts extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false,
      isAddModalOpen: false,
      selectedProductId: null,
      searchValue: '',
      error: null,
      pageIndex: 0,
      pageSize: 10,
    };
  }

  handleDelete = (product_id) => {
    const { deleteProduct } = this.context;
    deleteProduct(product_id);
  };

  handleEditClick = (product_id) => {
    this.setState({ selectedProductId: product_id, isEditModalOpen: true });
  };

  handleAddClick = () => {
    this.setState({ isAddModalOpen: true });
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handlePreviousPage = () => {
    this.setState((prevState) => ({ pageIndex: prevState.pageIndex - 1 }));
  };

  handleNextPage = () => {
    this.setState((prevState) => ({ pageIndex: prevState.pageIndex + 1 }));
  };

  getFilteredProducts = () => {
    const { products } = this.context;
    const { searchValue } = this.state;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  getCurrentPageData = () => {
    const { pageIndex, pageSize } = this.state;
    const filteredProducts = this.getFilteredProducts();
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  };

  render() {
    const { isEditModalOpen, isAddModalOpen, selectedProductId, searchValue, error, pageIndex, pageSize } = this.state;
    const filteredProducts = this.getFilteredProducts();
    const currentPageData = this.getCurrentPageData();

    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-4 ml-64">
          <h1 className="mb-4 text-2xl font-bold">Admin Products</h1>
          <div className="mb-8">
            <button onClick={this.handleAddClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </div>
          {/* Search input field */}
          <div className="mb-4">
            <input
              type="text"
              value={searchValue}
              onChange={this.handleSearchChange}
              placeholder="Search by product name"
              className="border border-gray-300 rounded py-2 px-4"
            />
          </div>
          {/* Error message */}
          {error && <div className="mb-4 text-red-500 font-bold">{error}</div>}
          {/* Table and pagination */}
          <div className="flex justify-center items-center overflow-x-auto">
            <div className="table-container" style={{ maxWidth: "1200px" }}>
              <h2 className="text-xl font-bold mb-5">Product List</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table headers */}
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-center">Product ID</th>
                      {/* Add more table headers here */}
                      <th className="px-4 py-2 text-center">Type</th>
                      <th className="px-4 py-2 text-center">Name</th>
                      <th className="px-4 py-2 text-center">SKU</th>
                      <th className="px-4 py-2 text-center">Short Description</th>
                      <th className="px-4 py-2 text-center">Price</th>
                      <th className="px-4 py-2 text-center">Original Price</th>
                      <th className="px-4 py-2 text-center">Discount</th>
                      <th className="px-4 py-2 text-center">Discount Rate</th>
                      <th className="px-4 py-2 text-center">Quantity Sold</th>
                      <th className="px-4 py-2 text-center">Review Count</th>
                      <th className="px-4 py-2 text-center">Inventory Status</th>
                      <th className="px-4 py-2 text-center">Stock Item Qty</th>
                      <th className="px-4 py-2 text-center">Stock Item Max Sale Qty</th>
                      <th className="px-4 py-2 text-center">Brand ID</th>
                      <th className="px-4 py-2 text-center">Brand Name</th>
                      <th className="px-4 py-2 text-center">Images</th>
                      <th className="px-4 py-2 text-center">Comments ID</th>
                      <th className="px-4 py-2 text-center">Specific Infos</th>
                      <th className="px-4 py-2 text-center sticky right-0 bg-gray-800">Actions</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {currentPageData.map(product => (
                      <tr key={product.product_id} className="hover:bg-gray-200">
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.product_id}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.type}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.name}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.sku}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.short_description}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.price}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.original_price}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.discount}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.discount_rate}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.quantity_sold}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.review_count}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.inventory_status}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.stock_item_qty}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.stock_item_max_sale_qty}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.brand_id}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.brand_name}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.images.join(', ')}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.comments_id.join(', ')}</td>
                        <td className="px-1 py-3 text-center overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis">{product.specific_infos.join(', ')}</td>
                        {/* Add more table cells for each column */}
                        <td className="px-1 py-3 text-center sticky right-0 bg-white z-10">
                          <div className="flex">
                            <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => this.handleEditClick(product.product_id)}>
                              Edit
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => this.handleDelete(product.product_id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination controls */}
              <div className="mt-4 flex justify-between">
                <button onClick={this.handlePreviousPage} disabled={pageIndex === 0} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Previous
                </button>
                <div>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {Math.ceil(filteredProducts.length / pageSize)}
                  </strong>
                </div>
                <button onClick={this.handleNextPage} disabled={currentPageData.length < pageSize} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Next
                </button>
              </div>
            </div>
          </div>
          {isEditModalOpen && (
            <AdminEditProduct product_id={selectedProductId} onClose={() => this.setState({ isEditModalOpen: false })} />
          )}
          {isAddModalOpen && (
            <AdminAddProduct onClose={() => this.setState({ isAddModalOpen: false })} />
          )}
        </div>
      </div>
    );
  }
}

export default AdminProducts;