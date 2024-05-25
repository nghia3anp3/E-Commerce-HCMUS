import React, {useContext} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import auth context
import { AuthContext } from '../context/AuthContext'
//import components
import Product from '../components/Product'
import Hero from '../components/Hero'
//import Link
import { Link } from 'react-router-dom';
const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div>
      {isLoggedIn ? (
        // Content to display if the user is logged in
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

export default Home