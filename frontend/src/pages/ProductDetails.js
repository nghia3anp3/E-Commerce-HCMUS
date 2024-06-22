import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import Comments from '../components/Comment';
import { CommentContext } from '../context/CommentContext';
import { SubCommentContext } from '../context/SubCommentContext';
import SpecificInfo from '../components/SpecificInfo';

const ProductDetails = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  //get the product id from the url
  const { product_id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { comments } = useContext(CommentContext);
  const { subcomments } = useContext(SubCommentContext);

  // State
  const [img, setImg] = useState('');
  const [specificProduct, setSpecificProduct] = useState([]);
  const [isError, setIsError] = useState(false);

  //get the single product based on id
  const product = products && products.find(item => {
    return item.product_id === parseInt(product_id);
  });

  useEffect(() => {
    if (product) {
      try {
        const parsedSpecificInfos = JSON.parse(
          product.specific_infos[0].replace(/'/g, '"').replace(/\bnan\b/g, 'null')
        );
        let specificProduct2 = Object.entries(parsedSpecificInfos);
        specificProduct2 = specificProduct2.filter(item => {
          return !(item[1] === null || (Array.isArray(item[1]) && item[1].length === 0));
        });
        setSpecificProduct(specificProduct2.slice(2));
      } catch (error) {
        setIsError(true);
      }
    }
  }, [product]);

  //if product is not found
  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  //destructure product
  const { name, price, short_description, images } = product;

  // Get image link
  let data = images.slice(0, 5);

  // format price
  let formatprice = price.toLocaleString();

  // Click Image
  const clickSmallImage = (index) => {
    if (index >= 0 && index < data.length) {
      setImg(data[index].base_url);
    }
  };

  // Extract comments and subcomments for the product
  let product_comments = comments.filter(item => item.product_id == product_id);
  let product_subcomments = subcomments.filter(item => item.product_id == product_id);

  // Extract type of product
  let type = product.type;

  return (
    <section className='pt-20 pb12 lg:py-25 h-auto'>
      <div className='container mx-auto pt-10 lg:pt-12'>
        {/* image & text wrapper */}
        <div className='flex flex-col lg:flex-row'>
          {/* image */}
          <div className='space-y-2'>
            <div className='flex justify-center'>
              {img === '' 
                ? (<img className='w-64 h-64 object-cover' src={data[0].base_url} alt='' />)
                : (<img className='w-64 h-64 object-cover' src={img} alt='' />)
              }
            </div>
            <div className='flex flew-row gap-2'>
              {data.map((item, index) => (
                <div className='cursor-pointer' key={index} onClick={() => clickSmallImage(index)}>
                  {/* Render the image */}
                  <img className='w-16 h-16' src={item.small_url} alt='backup'/>
                </div>
              ))}
            </div>
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left ml-6'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto'>
              {name}
            </h1>
            <div className='mb-6 flex justify-center lg:justify-start'>
              <p className='text-xl text-red-500 font-medium inline-block'>
                {formatprice} VND
              </p>
            </div>
            <p className='mb-8'>{short_description}</p>
            <button onClick={() => addToCart(product, product.product_id)} className='bg-stone-950 py-4 px-8 text-white'>Thêm vào giỏ hàng</button>
            {/* Thông tin chi tiết về sản phẩm */}
            <SpecificInfo specificProduct={specificProduct} isError = {isError} />
          </div>
        </div>
        <Comments product_comments={product_comments} product_subcomments={product_subcomments} product_id={product_id} type={type} />
      </div>
    </section>
  );
};

export default ProductDetails;
