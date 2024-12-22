import { getMealCustomer } from '@/apis/mealApi'
import { formatToVND } from '@/constants'
import { MealList } from '@/types'
import React, { useEffect, useState } from 'react'

const OrderList = ({ order }: { order: number }) => {
  const [shipping, setShipping] = useState(0)
  const [data, setData] = useState<MealList[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setShipping(order === 2 ? 30000 : 0)
  }, [order])

  const fetchMeals = async () => {
    try {
      const response = await getMealCustomer()
      const mealResponse = await response.data
      setTotal(mealResponse?.totalPrice)
      setData(mealResponse?.products)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold my-8'>Order List</h1>
        <div className='w-full flex flex-col bg[#e5e5e5] gap-3'>
          {data.map((item, index) => (
            <div key={index} className='flex flex-row justify-between items-center'>
              <div className='flex flex-row gap-3'>
                <img
                  src={item.productDetail.thumbnail}
                  alt={item.productDetail.name}
                  className='w-16 h-16 object-cover rounded-md'
                />
                <div className='flex flex-col justify-center'>
                  <span className='font-semibold'>
                    {item.productDetail.name} <span className='font-thin text-sm'>x {item.quantity}</span>
                  </span>
                </div>
              </div>
              <span className='font-semibold'>{formatToVND(item.price)}</span>
            </div>
          ))}
          {order == 2 && (
            <div className='flex flex-row justify-between items-center'>
              <span className='font-semibold'>Shipping</span>
              <span className='font-semibold'>{formatToVND(30000)}</span>
            </div>
          )}
          <div className='flex flex-row justify-between items-center border-t-2 pt-4'>
            <span className='font-semibold'>Total</span>
            <span className='font-semibold'>{formatToVND(total + shipping)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderList
