import { getBooking } from '@/apis/bookingApi'
import { getOrderDetail, OrderDetail } from '@/apis/orderApi'
import { OrderInfo, OrderItems } from '@/page/history-order/components'
import { BookingItem } from '@/types'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export function HistoryOrderPage() {
  const bookingId = localStorage.getItem('bookingId')
  const [bookingData, setBookingData] = useState<BookingItem>()
  const [orderData, setOrderData] = useState<OrderDetail[]>()
  const { id } = useParams()
  const fetchData = async () => {
    // Fetch order and comments data from API
    try {
      // Simulate fetching data from API
      const order = await getOrderDetail({ orderId: id || '' })
      console.log('Order:', order)
      setOrderData(order)
      const comments = await getBooking({ id: bookingId || '' })
      console.log('Order:', order)
      setBookingData(comments.data)
      console.log('Comments:', comments.data)
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, bookingId])
  return (
    <div className='container mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-6 text-blue-800 flex items-center'>
        <FileText className='w-8 h-8 mr-2' />
        Order Details
      </h1>
      <div className='grid gap-8'>
        {bookingData && <OrderInfo {...bookingData} />}
        <OrderItems items={orderData || []} />
      </div>
    </div>
  )
}
