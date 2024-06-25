import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';
import image from '../../src/img/input_image.jpg'


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ai_search_products: [],
        search_query: "",
        is_image: false,
    };
  }

  componentDidMount() {
    const ai_search_products_str = localStorage.getItem('ai_search_products');
    const search_query = localStorage.getItem('search_query');
    const is_image = JSON.parse(localStorage.getItem('is_image'));
    if (ai_search_products_str) {
      const ai_search_products = JSON.parse(ai_search_products_str);
      this.setState({ ai_search_products, search_query, is_image });
    }
  }

  render() {
    const { ai_search_products, search_query, is_image } = this.state;
    return (
      <div>
          <section className='h-full py-20'>
            <div className='container mx-auto px-4 md:px-12'>
                <div className='text-center mt-10 mb-8'>
                {!is_image ? (
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                    Kết quả tìm kiếm cho: <span className="text-blue-600">{search_query}</span>
                  </h2>
                ) : (
                  <div className="flex items-center justify-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mr-4">
                      Kết quả tìm kiếm cho:
                    </h2>
                    <img src={image} alt="Preview" className="w-20 h-20 rounded-full" />
                  </div>
                )}
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