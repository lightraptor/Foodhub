import React from 'react'
import heroImg from '../../../assets/hero.png'

export const HeroSection = () => {
  return (
    <div className='bg-black py-20 h-screen flex justify-center items-center'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row items-center'>
          {/* Text Content */}
          <div className='lg:w-1/2 text-center lg:text-left'>
            <h1 className='text-4xl lg:text-6xl text-white font-bold mb-4 animate-slideInLeft'>
              Tận hưởng những
              <br />
              món ăn ngon
            </h1>
            <p className='text-white my-6 animate-slideInLeft'>
              Chúng em mang đến cho người dùng trải nghiệm món ăn tuyệt vời hết nước chấm như là đội tuyển Việt Nam
              thắng giòn giã 2 - 0 trước Singapore
            </p>
            <a
              href='#table'
              className='bg-primary text-white py-3 mt-6 px-6 rounded-lg font-medium shadow-md hover:bg-primary-dark transition duration-300 animate-slideInLeft'
            >
              Đặt bàn ngay
            </a>
          </div>

          {/* Image Content */}
          <div className='lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0'>
            <div className='relative'>
              <img
                src={heroImg}
                alt='Delicious Meal'
                className='w-full md:max-w-lg max-w-sm transtion animate-spin-slow ease-linear'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
