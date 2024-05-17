import React from 'react';
import { FaArrowRight, FaArrowLeft} from "react-icons/fa6";

class Hero extends React.Component {

  state = {
    slides : [
      {image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png', descriptor: 'Đây là Samsung Galaxy S21'},
      {image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png', descriptor: 'Đây là Iphone 15'},
      {image: 'https://product.hstatic.net/1000283534/product/mauxam_1_5e360a1271fc4b40b3f30926dcec0aa8.jpeg', descriptor: 'Đây là Macbook'},
      {image: 'https://gamalaptop.vn/wp-content/uploads/2021/09/Acer-Nitro-5-2020-i5-10300H-GTX-1650-01.jpg', descriptor: 'Đây là Acer nitro 5'},
    ],
    current : 0,
  }

  previousSlide = () => {
    if (this.state.current === 0){
      this.setState({
        current: this.state.slides.length -1
      })
    }
    else{
      this.setState({
        current: this.state.current - 1
      })
    }
  }


  nextSlide = () => {
    if (this.state.current === this.state.slides.length -1){
      this.setState({
        current: 0
      })
    }
    else{
      this.setState({
        current: this.state.current + 1
      })
    }
  }

  render() { 
    let {slides, current} = this.state
    return (
    <div className='h-full overflow-hidden relative'>
    {/* ------------------------------------------------------------- */}
    <div
      className={`flex flex-row transition ease-out duration-40`}
      style={{
        transform: `translateX(-${current * 100}%)`,
      }}
    >
      {slides.map((s) => {
        return (
          <div className='w-full flex flex-shrink-0'>
            <div className='w-1/2'>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Thông tin sản phẩm</h1>
              <p className="ax-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{s.descriptor}</p>
            </div>
            <div className='w-1/2'>
              <img className='w-full' src={s.image} alt="LHH" />
            </div>
          </div>
        )
      })}
    </div>
    {/* ------------------------------------------------------------- */}
    <div className='absolute top-0 h-full w-full justify-between items-center flex text-black'>
      <button onClick={this.previousSlide}><FaArrowLeft/></button>
      <button onClick={this.nextSlide}><FaArrowRight/></button>
    </div>
    {/* ------------------------------------------------------------- */}
    <div className="absolute bottom-0 mt-16 flex justify-center gap-3 w-full">
      {slides.map((s, i) => {
        return (
          <div
            onClick={() => {
              this.setState({current: i})
            }}
            key={"circle" + i}
            className={`rounded-full w-5 h-5 cursor-pointer  ${
              i === current ? "bg-black" : "bg-gray-500"
            }`}
          ></div>
        );
      })}
    </div>
  </div>
    );
  }
}

export default Hero;
