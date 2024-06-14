import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ai_search_products: []
    };
  }

  componentDidMount() {
    const ai_search_products_str = localStorage.getItem('ai_search_products');
    if (ai_search_products_str) {
      const ai_search_products = JSON.parse(ai_search_products_str);
      this.setState({ ai_search_products });
    }
  }

  render() {
    const { ai_search_products } = this.state;
    return (
      <div>
        <section className='h-full py-20'>
          <div className='container mx-auto p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {ai_search_products.map(product => {
                return <Product product={product} key={product.product_id} images={product.images} />;
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default (props) => (
  <SearchPage {...props} location={useLocation()} />
);
