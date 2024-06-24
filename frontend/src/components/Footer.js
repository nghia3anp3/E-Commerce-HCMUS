import React, { Component } from 'react';
import Home from '../img/home.png';
import Github from '../img/github.png';


class Footer extends Component {
  render() {
    return (
      <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 py-6">
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Member section */}
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Thành viên:
              </h6>
              <div className='flex flex-col'>
                <p>Lê Phan Minh Đạt - 21120046</p>
                <p>Nguyễn Đặng Nhật Huy - 21120255 </p>
                <p>Nguyễn Đức Nam - 21120291</p>
                <p>Lê Nguyễn Trọng Nghĩa - 21120293</p>
                <p>Lê Hữu Hưng - 21120463</p>
              </div>
            </div>
            {/* Products section */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Sản phẩm
              </h6>
              <p className="text-neutral-600 dark:text-neutral-200">
                Điện thoại
              </p>
              <p className="text-neutral-600 dark:text-neutral-200">
                Laptop
              </p>
            </div>
            {/* Contact section */}
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Liên hệ
              </h6>
              <div className='flex items-center justify-center md:justify-start'>
                <img className='w-6 h-auto inline mr-2' src={Home} alt='Home'></img>
                HCMUS
              </div>
              {/* <div className='flex items-center justify-center md:justify-start'>
                <img className='w-6 h-auto inline mr-2' src={Mail} alt='Mail'></img>
                lehuuhung30023010@gmail.com
              </div>
              <div className='flex items-center justify-center md:justify-start'>
                <img className='w-6 h-auto inline mr-2' src={Phone} alt='Phone'></img>
                0355559236
              </div> */}
            </div>
          </div>
        </div>
        {/* Social network icons */}
        <div className="flex justify-center items-center border-t-2 border-neutral-200 py-6 dark:border-neutral-500 mx-6">
          <div className="flex flex-row">
            {/* <a className='w-6 h-6 mr-4' href="https://www.facebook.com/hung.lehuu.18400" target="blank">
              <img src={Facebook} alt="Le Huu Hung-facebook" />
            </a> */}
            <a className='w-6 h-6 mr-4' href="https://github.com/nghia3anp3/E-Commerce-HCMUS" target="blank">
              <img src={Github} alt="github" />
            </a>
            {/* <a className='w-6 h-6 mr-4' href="https://www.linkedin.com/in/h%C6%B0ng-l%C3%AA-h%E1%BB%AFu-b87883247/" target="blank">
              <img src={Linkedin} alt="Le Huu Hung-linkedin" />
            </a> */}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
