'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Product } from '@/types'
import { fetchProduct } from '@/apis/productApi'

export default function FoodCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  })
  const [foodProducts, setFoodProducts] = useState<Product[]>([])

  const fetchData = async () => {
    try {
      const response = await fetchProduct({ PageNumber: 1, PageSize: 10000 })
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data
      setFoodProducts(data.items || [])
    } catch (error) {
      console.error('Error fetching food products:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const [selectedIndex, setSelectedIndex] = useState(0)
  console.log(selectedIndex)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, 3000)

      return () => clearInterval(intervalId)
    }
  }, [emblaApi])

  return (
    <>
      <div className='h-[70%] flex flex-col justify-center gap-10 my-20'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Các Món Ăn Của Chúng Tôi</h1>
        <div className='overflow-hidden mx-10' ref={emblaRef}>
          <div className='flex'>
            {foodProducts.map((product) => (
              <div key={product.id} className='flex-[0_0_25%] min-w-0 px-2'>
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    width={200}
                    height={200}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <h2 className='text-lg font-semibold text-center'>{product.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
