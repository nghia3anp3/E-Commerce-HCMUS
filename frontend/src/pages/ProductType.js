import React, {useContext, useState} from 'react'
//import product context
import { ProductContext } from '../context/ProductContext'
//import components
import Product from '../components/Product'
//import useParams
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
//Icon
import { FaArrowRight, FaArrowLeft} from "react-icons/fa6";


const ITEMS_PER_PAGE = 40

const ProductType = () => {
  // Get type
  const {type, p_type, page} = useParams();
  // get products from product context
  const { products } = useContext(ProductContext);
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  //filtered category
  const filteredProducts = products.filter((item) => {
    return (
      item.type === p_type && item.brand_name === type 
    );
  });
  // Trang hiện tại
  const [currentPage, setCurrentPage] = useState(page);
  // Số lượng trang
  const totalPage = Math.ceil((filteredProducts.length/ITEMS_PER_PAGE))
  let arrPage = []
  for (let i = 1; i<= totalPage;i ++){
    arrPage.push(i)
  }
  // Lấy sản phẩm cho trang hiện tại
  const getProductsPerPage = (currentPage) => {
    const startIndex = (currentPage - 1)*ITEMS_PER_PAGE
    const endIndex = startIndex + 40
    return filteredProducts.slice(startIndex, endIndex)
  }
  //Chuyển đến trang tiếp theo
  const goNextPage = () => {
    if (currentPage === totalPage) {
      setCurrentPage(0)
    }
    else{
      setCurrentPage(currentPage + 1)
    }
  }

  //Chuyển qua trang phía trước
  const goPreviousPage = () => {
    if (currentPage === 0){
      setCurrentPage(totalPage)
    }
    else{
      setCurrentPage(currentPage - 1)
    }
  }

  //
  const currentProducts = getProductsPerPage(page)

  return (
    <div>
      {isLoggedIn ? (
        // Content to display if the user is logged in
        <section className='py-20'>
          <div className='container mx-auto p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {currentProducts.map(product => (
                <Product product={product} key={product.product_id} images = {product.images}/>
              ))}
            </div>
            {/* Chuyển hướng trang */}
            <div className='flex flex-row justify-center gap-4 m-6'>
              {arrPage.map((item) => (
                <div className='flex-none w-15 border-2 border-black-100 p-4'>
                  <Link to = {`/${p_type}/${type}/${item}`}>{item}</Link>
                </div>
              ))}
            </div>
            </div>
        </section>
      ) : 
      (
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