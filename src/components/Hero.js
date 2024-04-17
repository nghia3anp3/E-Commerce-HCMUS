import React from 'react';
import { FaArrowRight, FaArrowLeft} from "react-icons/fa6";

class Hero extends React.Component {

  state = {
    slides : [
      {image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png', descriptor: 'Đây là Samsung Galaxy S21'},
      {image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png', descriptor: 'Đây là Iphone 15'},
      {image: 'https://vcdn-sohoa.vnecdn.net/2023/07/06/DSCF3483-1686014164-7221-1688583032.jpg', descriptor: 'Đây là Macbook'},
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
      <div className='overflow-hidden relative'>
    {/* ------------------------------------------------------------- */}
    <div
      className={`flex transition ease-out duration-40`}
      style={{
        transform: `translateX(-${current * 100}%)`,
      }}
    >
      {slides.map((s) => {
        return (
          <img className='mx-20' src={s.image} alt="LHH" />
        )
      })}
    </div>
    {/* ------------------------------------------------------------- */}
    <div className='absolute top-0 h-full w-full justify-between items-center flex text-black px-6'>
      <button onClick={this.previousSlide}><FaArrowLeft/></button>
      <button onClick={this.nextSlide}><FaArrowRight/></button>
    </div>
    {/* ------------------------------------------------------------- */}
    <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
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
