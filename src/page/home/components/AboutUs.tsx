import React from 'react'
import About1 from '@/assets/about-1.jpg'
import About2 from '@/assets/about-2.jpg'
import About3 from '@/assets/about-3.jpg'
import About4 from '@/assets/about-4.jpg'
import { Button } from '@/components'

export const AboutUs: React.FC = () => {
  return (
    <div className='py-20 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap -mx-4'>
          <div className='lg:w-1/2 w-full px-4'>
            <div className='flex flex-wrap mx-3'>
              <div className='sm:w-1/2 w-full px-3'>
                <img
                  className='rounded-lg w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105'
                  src={About1}
                  alt='About 1'
                />
              </div>
              <div className='sm:w-1/2 w-full px-3 mt-10 sm:mt-0'>
                <img
                  className='rounded-lg w-3/4 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105'
                  src={About2}
                  alt='About 2'
                />
              </div>
              <div className='sm:w-1/2 w-full px-3 mt-10 sm:mt-0'>
                <img
                  className='rounded-lg w-3/4 object-cover mt-6 transition-transform duration-500 ease-in-out transform hover:scale-105'
                  src={About3}
                  alt='About 3'
                />
              </div>
              <div className='sm:w-1/2 w-full px-3'>
                <img
                  className='rounded-lg w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105'
                  src={About4}
                  alt='About 4'
                />
              </div>
            </div>
          </div>
          <div className='lg:w-1/2 w-full px-4'>
            <h5 className='text-xl font-semibold text-primary mb-2'>About Us</h5>
            <h1 className='text-4xl font-bold mb-4'>
              Welcome to <i className='fa fa-utensils text-primary mr-2'></i>Foodhub
            </h1>
            <p className='mb-4'>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et
              lorem et sit, sed stet lorem sit.
            </p>
            <p className='mb-4'>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum
              et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className='flex flex-wrap mb-4'>
              <div className='sm:w-1/2 w-full px-3'>
                <div className='flex items-center border-l-4 border-primary pl-4 py-2'>
                  <h1 className='text-4xl font-bold text-primary mb-0'>15</h1>
                  <div className='ml-4'>
                    <p className='mb-0'>Years of</p>
                    <h6 className='text-sm uppercase mb-0'>Experience</h6>
                  </div>
                </div>
              </div>
              <div className='sm:w-1/2 w-full px-3'>
                <div className='flex items-center border-l-4 border-primary pl-4 py-2'>
                  <h1 className='text-4xl font-bold text-primary mb-0'>50</h1>
                  <div className='ml-4'>
                    <p className='mb-0'>Popular</p>
                    <h6 className='text-sm uppercase mb-0'>Master Chefs</h6>
                  </div>
                </div>
              </div>
            </div>
            <Button className='mt-2 py-3 text-base px-5'>Read More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
