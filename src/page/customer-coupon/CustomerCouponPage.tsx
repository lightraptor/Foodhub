import React, { useEffect } from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-toastify'
import { getCustomerCoupon } from '@/apis/userCouponApi'
import { UserCoupon } from '@/types'

export const receivedCoupons = [
  {
    id: '57i0f9ge-9d3h-74ii-egii-42hh5igi1h61',
    couponCode: 'WELCOME15',
    discountPercent: 15,
    discountAmount: 0,
    expiryDate: '2023-12-31'
  },
  {
    id: '68j1g0hf-0e4i-85jj-fhjj-53ii6jgj2i72',
    couponCode: 'BIRTHDAY20',
    discountPercent: 20,
    discountAmount: 0,
    expiryDate: '2023-11-30'
  },
  {
    id: '79k2h1ig-1f5j-96kk-gikk-64jj7khk3j83',
    couponCode: 'FREESHIP50',
    discountPercent: 0,
    discountAmount: 50000,
    expiryDate: '2023-10-31'
  }
]

export const CustomerCouponPage = () => {
  const [userCoupons, setUserCoupons] = useState<UserCoupon[]>([])

  const fetchData = async () => {
    try {
      const response = await getCustomerCoupon()
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data
      setUserCoupons(data)
    } catch (error) {
      console.error('Error fetching customer coupons:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log('Fetching')
  }, [userCoupons])
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Mã giảm giá của tôi</h1>
      {userCoupons.length === 0 ? (
        <p className='text-center text-gray-500'>Bạn chưa có mã giảm giá nào.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {userCoupons.map((coupon, index) => (
            <Card key={index}>
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
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full'
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.couponCode)
                    toast.success('Sao chép mã giảm giá thành công!', { autoClose: 2000 })
                  }}
                >
                  Sao chép mã
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
