import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ai_search_products: [],
        search_query: ""
    };
  }

  componentDidMount() {
    const ai_search_products_str = localStorage.getItem('ai_search_products');
    const search_query = localStorage.getItem('search_query'); // Lấy giá trị của item từ localStorage
    if (ai_search_products_str) {
      const ai_search_products = JSON.parse(ai_search_products_str);
      this.setState({ ai_search_products, search_query });
    }
  }

  render() {
    const { ai_search_products, search_query } = this.state;
    return (
      <div>
          <section className='h-full py-20'>
            <div className='container mx-auto px-4 md:px-12'>
                <div className='text-center mt-10 mb-8'>
                    <h2 className='text-2xl md:text-4xl font-bold text-gray-800'>
                        Kết quả tìm kiếm cho: <span className='text-blue-600'>{search_query}</span>
                    </h2>
                </div>
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