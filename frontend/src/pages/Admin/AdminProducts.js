import React, { Component } from 'react';
import AdminSidebar from '../../components/Admin/SidebarAdmin';
import ProductList from '../../components/Admin/Product/ProductList';
import ProductForm from '../../components/Admin/Product/ProductForm';

class AdminProducts extends Component {
  state = {
    products: [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 }
    ]
  };

  addProduct = (product) => {
    const newProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...product
    };
    this.setState({ products: [...this.state.products, newProduct] });
  }

  render() {
    return (
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 ml-0 md:ml-64">
          <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
          <div className="mb-8">
            <ProductForm onSubmit={this.addProduct} />
          </div>
          <ProductList products={this.state.products} />
        </div>
      </div>
    );
  }
}

export default AdminProducts;
