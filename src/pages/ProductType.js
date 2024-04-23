import React, {useContext} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import components
import Product from '../components/Product'
//import useParams
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';

const ProductType = () => {
  // Get type
  const {type, p_type} = useParams();
  const parseProductType = (p_type) => {
    let types
    if (p_type === 'phone'){
        types = "phone"
    }
    else if(p_type === 'laptop'){
        types = "laptop"
    }
    return types
  }
  // get products from product context
  const { products } = useContext(ProductContext);
  const isLoggedIn = localStorage.getItem('token') !== null;

  //filtered category
  const filteredProducts = products.filter((item) => {
    let types = parseProductType(p_type)
    return (
      item.category === types && item.title === type 
    );
  });
  return (
    <div>
      {isLoggedIn ? (
        // Content to display if the user is logged in
        <section className='py-20'>
          <div className='container mx-auto p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {products.map(product => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        // Content to display if the user is not logged in
        <div className="text-center py-20 mt-36">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view products</h2>
          <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Log In</Link>
        </div>
      )}
    </div>
  );
}


export default ProductType