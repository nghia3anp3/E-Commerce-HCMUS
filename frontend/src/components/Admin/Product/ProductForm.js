import React, { Component } from 'react';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      price: this.state.price,
    });
    this.setState({
      name: '',
      price: '',
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Add Product</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            className="mr-2 mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
            className="mr-2 mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4">Add</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
