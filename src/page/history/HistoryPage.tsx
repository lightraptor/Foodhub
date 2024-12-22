import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { getUserId } from '@/apis/userApi'
import { getCustomerOrder } from '@/apis/orderApi'
import { OrderHistoryItem } from '@/types'
import { formatToVND } from '@/constants'
export const HistoryPage = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([])
  const fetchData = async () => {
    try {
      const userId = await getUserId()
      if (!userId) return
      const response = await getCustomerOrder({ userId: userId })
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data
      console.log(data)
      setOrders(data.items)
    } catch (error) {
      console.error('Error fetching customer coupons:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-8'>Lịch sử đơn hàng của bạn</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID đơn hàng</TableHead>
              <TableHead>Loại đơn hàng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày đặt hàng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{order.orderTypeName}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{new Date(order.createdDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell className='text-green-600 font-bold'>{formatToVND(Number(order?.totalAmount))}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => (
                      localStorage.setItem('bookingId', order?.bookingId),
                      (window.location.href = `/history/${order.id}`)
                    )}
                  >
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
