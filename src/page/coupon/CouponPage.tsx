'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-toastify'
import { Coupon, UserCoupon } from '@/types'
import { getAllCoupon } from '@/apis/couponApi'
import { getCustomerCoupon, postReceiveCoupon } from '@/apis/userCouponApi'

export default function CouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [disabledCoupons, setDisabledCoupons] = useState<Set<string>>(new Set()) // Sử dụng Set để tối ưu hiệu suất

  // Lấy danh sách mã đã chọn từ API
  const fetchSelectedCoupons = async () => {
    try {
      const response = await getCustomerCoupon()
      if (!response.success) {
        console.error(response.message)
        return
      }
      const selectedCoupons: UserCoupon[] = response.data // Mảng chứa các mã đã chọn
      const couponIds = new Set(selectedCoupons.map((item) => item.couponId)) // Chuyển thành Set để tra cứu nhanh
      setDisabledCoupons(couponIds)
    } catch (error: unknown) {
      console.error('Error fetching selected coupons:', error)
    }
  }

  const fetchCoupon = async () => {
    try {
      const response = await getAllCoupon({ PageNumber: 1, PageSize: 10 })
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data
      setCoupons(data.items)
    } catch (error: unknown) {
      console.error('Error fetching coupons:', error)
    }
  }

  useEffect(() => {
    fetchCoupon()
    fetchSelectedCoupons() // Lấy danh sách mã đã chọn khi trang được tải
  }, [])

  const addCoupon = async (couponId: string) => {
    try {
      const response = await postReceiveCoupon({ couponId })
      if (!response.success) {
        toast.error(response.message, { autoClose: 2000 })
        console.error(response.message)
        return
      }

      // Cập nhật trạng thái sau khi thêm mã giảm giá thành công
      setDisabledCoupons((prev) => new Set(prev).add(couponId))
      toast.success('Thêm mã giảm giá thành công!', { autoClose: 2000 })
      fetchCoupon()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding coupon:', error.message)
      }
    }
  }

  return (
    <div className='container mx-auto p-4 py-10'>
      <h1 className='text-2xl font-bold mb-6'>Danh sách mã giảm giá</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {coupons.map((coupon) => (
          <Card key={coupon.id}>
            <CardHeader>
              <CardTitle className='flex justify-between items-center'>
                <span>{coupon.couponCode}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg font-semibold'>
                {coupon.discountPercent > 0
                  ? `Giảm ${coupon.discountPercent}%`
                  : `Giảm ${coupon.discountAmount.toLocaleString('vi-VN')}đ`}
              </p>
              <p className='text-sm text-gray-500'>Còn lại: {coupon.quantity}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => addCoupon(coupon.id)}
                className='w-full'
                disabled={disabledCoupons.has(coupon.id)} // Kiểm tra nhanh hơn với Set
              >
                {disabledCoupons.has(coupon.id) ? 'Đã thêm' : 'Thêm mã giảm giá'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
