import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { CartContext } from '../context/CartContext';

class Product extends Component {

  render() {
    const { product, images } = this.props;
    // Price
    let price = product.price
    if (price !== undefined){
      price = price.toLocaleString()
    }
    // Image
    // const { firstBaseUrl } = this.state;
    return (
      <CartContext.Consumer>
        {({ addToCart }) => (
          <div>
            <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
              <div className='w-full h-full flex justify-center items-center bg-white'>
                {/* image */}
                <div className='w-[150px] mx-auto flex justify-center items-center'>
                  <Link to={`/product/${product.product_id}`}> 
                    <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={images[0].base_url} alt='' />
                  </Link>
                </div>
                {/* button */}
                <div className='absolute top-0 -right-0 group-hover:right-5
                  w-12 h-30 flex flex-col items-center justify-center gap-y-2 
                  opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <button onClick={() => addToCart(product, product.product_id)}>
                    <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
                      <BsPlus className='text-3xl'/>
                    </div>
                  </button>
                  <Link to={`/product/${product.product_id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'><BsEyeFill /></Link>
                </div>
              </div>
            </div>
            {/* category & title & price */}
            <div>
              
              <div className='text-sm capitalize text-gray-500 mb-1'>{product.brand_name}</div>
              <Link to={`/product/${product.product_id}`}>
                <h2 className='font-semibold mb-1'>{product.name}</h2>
              </Link>
              <div className='font-semibold'>{price} VND</div>
            </div>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

export default Product;
