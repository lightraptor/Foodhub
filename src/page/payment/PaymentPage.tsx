import { Link, useSearchParams } from 'react-router-dom'
import check from '@/assets/check.png'
import { Button } from '@/components/ui/button'
import { MENUS } from '@/defines'

export const PaymentPage = () => {
  const [searchParams] = useSearchParams()

  // Lấy các giá trị từ query parameters
  const paymentId = searchParams.get('PaymentId')
  const paymentStatus = searchParams.get('PaymentStatus')
  const paymentMessage = searchParams.get('PaymentMessage')
  const paymentDate = searchParams.get('PaymentDate')
  const amount = searchParams.get('Amount')

  return (
    <>
      <div className='container mx-auto flex flex-col justify-center items-center py-10'>
        <img src={check} alt='check' className='w-24 h-24 mt-10' />
        {paymentStatus === '00' ? (
          <p className='text-2xl font-bold mt-4'>Thanh toán thành công</p>
        ) : (
          <p className='text-2xl font-bold mt-4'>Thanh toán thất bại</p>
        )}
        <p className='text-3xl mt-3 font-bold'>
          {amount
            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount))
            : 'Not available'}
        </p>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Date</strong>
          <p>{decodeURIComponent(paymentDate!)}</p>
        </div>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Payment ID</strong>
          <p>{paymentId}</p>
        </div>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Message:</strong>
          <p>{decodeURIComponent(paymentMessage!)}</p>
        </div>
        <Link to={MENUS.Home.path}>
          <Button className='mt-10 bg-[#0765ff] text-[#fff]'>Back to Home</Button>
        </Link>
      </div>
    </>
  )
}
