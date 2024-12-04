import { ArrowLeft } from 'lucide-react'
import OrderList from './components/OrderList'
import OrderTabs from './components/OrderTabs'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Quay về trang trước
  }
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center my-5'>
        <button
          onClick={handleBack}
          className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded flex flex-row'
        >
          <ArrowLeft />
          Back
        </button>
      </div>
      <h1 className='text-3xl font-bold text-center'>Checkout</h1>
      <div className='flex md:flex-row flex-col-reverse gap-2'>
        <div className='md:w-2/3 w-full mx-auto'>
          <OrderTabs />
        </div>
        <div className='md:w-1/3 w-full mx-auto'>
          <OrderList />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
