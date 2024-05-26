import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/SidebarAdmin';

const AdminAddProduct = ({ onClose }) => {
  const {addProduct } = useContext(ProductContext)
  const [formData, setFormData] = useState({
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
    images: [],
    comments_id: [],
    specific_infos: [],
  });
  const [error, setError] = useState('');
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Make API call to add the product
      const newproduct = {
        ...formData,
        product_id: parseInt(formData.product_id),
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
      addProduct(newproduct);
      // Close the modal
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product.');
    }
  };

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">Short Description:</label>
              <textarea
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
            <textarea
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="comments_id" className="block text-sm font-medium text-gray-700">Comments ID:</label>
            <textarea
              id="comments_id"
              name="comments_id"
              value={formData.comments_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="specific_infos" className="block text-sm font-medium text-gray-700">Specific Infos:</label>
            <textarea
              id="specific_infos"
              name="specific_infos"
              value={formData.specific_infos}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 w-full">
        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Product
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};


// AdminEditProduct component as a modal
const AdminEditProduct = ({ product_id, onClose }) => {
  const { findProductById, updateProduct } = useContext(ProductContext);
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
  const [error, setError] = useState('');

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
        setError('Failed to fetch product details.');
        setLoading(false);
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
      // await axios.put(`http://localhost:8000/api/products/${product_id}`, updatedProduct);
      updateProduct(product_id, updatedProduct)
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">Short Description:</label>
              <textarea
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
            <textarea
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="comments_id" className="block text-sm font-medium text-gray-700">Comments ID:</label>
            <textarea
              id="comments_id"
              name="comments_id"
              value={formData.comments_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="specific_infos" className="block text-sm font-medium text-gray-700">Specific Infos:</label>
            <textarea
              id="specific_infos"
              name="specific_infos"
              value={formData.specific_infos}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 w-full">
        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

// AdminProducts component
const AdminProducts = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);
  const handleDelete = (product_id) => {
    deleteProduct(product_id)
  };
  
  const handleEditClick = product_id => {
    setSelectedProductId(product_id);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [products, searchValue]);

  const columns = useMemo(
    () => [
      {
        Header: 'Product ID',
        accessor: 'product_id',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),

        width: 900,
      },
      {
        Header: 'SKU',
        accessor: 'sku',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Short Description',
        accessor: 'short_description',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Original Price',
        accessor: 'original_price',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Discount Rate',
        accessor: 'discount_rate',
      },
      {
        Header: 'Quantity Sold',
        accessor: 'quantity_sold',
      },
      {
        Header: 'Review Count',
        accessor: 'review_count',
      },
      {
        Header: 'Inventory Status',
        accessor: 'inventory_status',
      },
      {
        Header: 'Stock Item Qty',
        accessor: 'stock_item_qty',
      },
      {
        Header: 'Stock Item Max Sale Qty',
        accessor: 'stock_item_max_sale_qty',
      },
      {
        Header: 'Brand ID',
        accessor: 'brand_id',
      },
      {
        Header: 'Brand Name',
        accessor: 'brand_name',
      },
      {
        Header: 'Images',
        accessor: 'images',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Comments ID',
        accessor: 'comments_id',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Specific Infos',
        accessor: 'specific_infos',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
              onClick={() => handleEditClick(row.original.product_id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={() => handleDelete(row.original.product_id)}
            >
              Delete
            </button>
          </div>
        )
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredProducts, // Use filteredProducts instead of products
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4 ml-64">
        <h1 className="mb-4 text-2xl font-bold">Admin Products</h1>
        <div className="mb-8">
          <button onClick={handleAddClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
        </div>
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
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
              <table {...getTableProps()} className="w-full">
                {/* Table headers */}
                <thead className="bg-gray-800 text-white">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-4 py-2 text-center"
                          style={{ minWidth: column.minWidth, width: column.width }}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* Table body */}
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-gray-200">
                        {row.cells.map(cell => (
                          <td
                            {...cell.getCellProps()}
                            className="px-1 py-5 text-center"
                            style={{ minWidth: cell.column.minWidth, width: cell.column.width }}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination controls */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Previous
              </button>
              <div>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </div>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {isEditModalOpen && (
          <AdminEditProduct
            product_id={selectedProductId}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
        {isAddModalOpen && (
          <AdminAddProduct onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default AdminProducts;