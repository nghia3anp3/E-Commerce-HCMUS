import React, {useContext} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import components
import Product from '../components/Product'
//import useParams
import {useParams} from 'react-router-dom'

const ProductType = () => {
  // Get type
  const {type, p_type} = useParams();
  const parseProductType = (p_type) => {
    let types
    if (p_type === 'MenClothing'){
        types = "men's clothing"
    }
    else if(p_type === 'WomenClothing'){
        types = "women's clothing"
    }
    else if(p_type === 'Jewelery'){
        types = "jewelery"
    }
    else if(p_type === 'Electronics'){
        types = "electronics"
    }
    return types
  }
  // get products from product context
  const { products } = useContext(ProductContext);
  //filtered category
  const filteredProducts = products.filter((item) => {
    let types = parseProductType(p_type)
    return (
      item.category === types && item.title.includes(type) 
    );
  });
  return (
    <div>
      <section className='py-20'>
        <div className='container mx-auto p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map(product =>{
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


export default ProductType