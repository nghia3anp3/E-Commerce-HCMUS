import React, {useContext} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import components
import Product from '../components/Product'
const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  //filtered category
  // const filteredProducts = products.filter((item) => {
  //   return (
  //     item.category === "men's clothing" || item.category === "women's clothing"
  //   );
  // });
  return (
    <div>
      <section className='py-20'>
        <div className='container mx-auto p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {products.map(product =>{
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home