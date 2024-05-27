import React, {useContext} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import auth context
//import components
import Product from '../components/Product'
import Hero from '../components/Hero'
//import Link
const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  return (
    <div>
        <div>
        <section className='h-full py-20'>
          <div className="h-auto w-[80%] m-auto pt-11">
            <Hero />
          </div>
          <div className='container mx-auto p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {products.map(product =>{
                return <Product product={product} key={product.product_id} images = {product.images} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home