import React, {useContext, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
//import product context
import { ProductContext } from '../context/ProductContext'
//import auth context
//import components
import Product from '../components/Product'
// Route
import { Link } from 'react-router-dom';
//Icon
import { FaArrowRight, FaArrowLeft} from "react-icons/fa6";

const ITEMS_PER_PAGE = 40

const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  
  const { page } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(products.length / ITEMS_PER_PAGE);
  const maxVisiblePages = 5;

  useEffect(() => {
    // Update currentPage state when the URL parameter changes
    setCurrentPage(Number(page) || 1);
    //
    window.scrollTo(0, 0);
  }, [page]);


  // Tạo số lượng trang hiện thị tối đa
  const getVisiblePages = () => {
    const pages = [];
    for (let i = currentPage; i < currentPage + maxVisiblePages && i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Lấy sản phẩm cho trang hiện tại
  const getProductCurrentPage = (current_page) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }

  // Chuyển qua trang tiếp theo
  const goNextPage = (current_page) => {
    let next_page = current_page + 1;
    if (next_page === totalPage + 1) {
      next_page = 1;
    }
    navigate(`/${next_page}`);
  }

  // Quay lại trang trước
  const goPreviousPage = (current_page) => {
    let previous_page = current_page - 1;
    if (previous_page === 0) {
      previous_page = totalPage;
    }
    navigate(`/${previous_page}`);
  }

  let currentProducts = getProductCurrentPage(currentPage);

  return (
      <div>
        <section className='h-full py-20'>
          {/* <div className="h-auto w-[60%] sm:w-[80%] m-auto pt-8 sm:pt-11">
            <Hero />
          </div> */}
          <div className='container mx-auto p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {currentProducts.map(product => {
                return <Product product={product} key={product.product_id} images={product.images} />;
              })}
            </div>
            {/* Chuyển hướng trang */}
            <div className='flex flex-row justify-center gap-4 m-6'>
              <button onClick={() => goPreviousPage(currentPage)}>
                <FaArrowLeft />
              </button>
              <div className='flex flex-row justify-center gap-4 m-6'>
                {getVisiblePages().map((item) => (
                  <div className='flex-none w-15 border-2 border-black-100 p-4' key={item}>
                    <Link to={`/${item}`}>{item}</Link>
                  </div>
                ))}
              </div>
              <button onClick={() => goNextPage(currentPage)}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Home
