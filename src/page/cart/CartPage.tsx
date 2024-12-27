import React, { useEffect } from 'react'
import { CartTable, columns } from './components'
import { getMealCustomer } from '@/apis/mealApi'
import { MealList } from '@/types'
import { formatToVND } from '@/constants'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/defines'
import cartEmpty from '../../assets/cart-empty.png'
import { Button } from '@/components'

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  }
  // ...
]

const CartPage = () => {
  const [data, setData] = React.useState<MealList[]>([])
  const [total, setTotal] = React.useState(0)

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
      <div className='container mx-auto py-10'>
        <h1 className='text-2xl font-bold my-8'>Xem lại giỏ hàng</h1>
        {data.length > 0 ? (
          <div className='flex flex-row gap-2'>
            <div className='w-2/3'>
              {data && (
                <>
                  <CartTable data={data.map((item) => item)} columns={columns(fetchMeals)} />
                </>
              )}
            </div>
            <div className='w-1/3'>
              <div className='bg-[#f5f5f5] rounded-lg shadow-md overflow-hidden cursor-pointer border'>
                <div className='p-4'>
                  <h2 className='text-lg font-semibold'>Order Summary</h2>
                  <ul className='mt-2'>
                    {data &&
                      data.map((item) => (
                        <li key={item.id} className='mb-2'>
                          <div className='flex flex-row justify-between'>
                            <div className='flex flex-row justify-start items-center gap-3'>
                              <img
                                src={item.productDetail.thumbnail}
                                alt={item.productDetail.name}
                                className=' w-12 h-12'
                              />
                              <div className='flex flex-col'>
                                <p className='text-sm font-bold'>{item.productDetail.name}</p>
                                <p className='text-sm font-thin'>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <p className='text-sm font-bold'>{formatToVND(item.price || 0)}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <h1 className='text-xl font-bold my-2 text-right'>Total: {formatToVND(total)}</h1>
                </div>
                <div className='p-4'>
                  <Link to={ROUTES.Order.path}>
                    <button className='bg-[#0765ff] text-[#fff] w-full p-3 rounded hover:bg-[#0765ff]/90'>
                      Thanh toán
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <img src={cartEmpty} alt='' className='w-[200px] h-[200px] mx-auto my-10' />
            <p className='text-center text-xl font-bold'>Giỏ hàng hiện đang trống</p>
            <p className='text-center my-3'>Thêm những món ăn tuyệt vời vào giỏ hàng của bạn ngay!</p>
            <div className='flex flex-row w-full'>
              <Link to={ROUTES.Product.path} className='mx-auto'>
                <Button className='text-white bg-[#0765ff] hover:bg-[#0765ff]/90 w-fit'>Tiếp tục mua hàng</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartPage
