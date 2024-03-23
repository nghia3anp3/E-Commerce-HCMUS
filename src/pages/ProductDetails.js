import React, { useContext } from 'react'
//import useParams
import {useParams} from 'react-router-dom'
//import cart context
import { CartContext } from '../context/CartContext'
//import product context
import { ProductContext } from '../context/ProductContext'
const ProductDetails = () => {
  //get the product id from the url
  const {id} = useParams();
  const { products } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  //get the single product based on id
  const product = products.find(item => {
    return item.id === parseInt(id)
  })

  //if product is not found
  if (!product) {
    return <section className='h-screen flex justify-center items-center'>
      Loading...
    </section>
  }
  //destructure product
  const {title, price, description, image} = product
  return (
    <section className='pt-20 pb12 lg-py-25 h-screen'>
      <div className='container mx-auto'>
        {/* image & text wrapper */}
        <div className='flex flex-col lg:flex-row lg:flex-row-reverse items-center'>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto'>
              {title}
            </h1>
            <div className='mb-6 flex justify-center lg:justify-start'>
              <p className='text-xl text-red-500 font-medium inline-block'>
                $ {price}
              </p>
            </div>
            <p className='mb-8'>{description}</p>
            <div className='flex justify-center lg:justify-start'></div>
              <button onClick={() => addToCart(product, product.id)} className='bg-stone-950 py-4 px-8 text-white'>Thêm vào giỏ hàng</button>
            </div>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt='' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails