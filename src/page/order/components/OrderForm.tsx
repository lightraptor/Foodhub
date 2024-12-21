import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { postOrder } from '@/apis/orderApi'
import { toast } from 'react-toastify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchPaymentDestination, paymentItem } from '@/apis/paymentDestination'
import { fetchPayment } from '@/apis/paymentApi'
import { fetchMerchantPaging } from '@/apis/merchantApi'
import { UserCoupon } from '@/types'
import { getCustomerCoupon } from '@/apis/userCouponApi'

// Define the schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name must be under 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone must have at least 10 digits')
    .max(15, 'Phone must be under 15 digits')
    .regex(/^\d+$/, 'Phone must contain only numbers'),
  address: z
    .string()
    .min(5, 'Address must have at least 5 characters')
    .max(100, 'Address must be under 100 characters'),
  contentPayment: z.string()
})

const OrderForm = ({ orderType }: { orderType: number }) => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  const [listMethod, setListMethod] = React.useState<paymentItem[]>([])
  const [payMentMethod, setPayMentMethod] = React.useState<string>('')
  const [merchantId, setMerchantId] = React.useState<string>('')
  const [coupons, setCoupons] = React.useState<UserCoupon[]>([])
  const [selectedCouponId, setSelectedCouponId] = React.useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      contentPayment: 'client'
    }
  })

  useEffect(() => {
    console.log('payMentMethod', payMentMethod)
  }, [payMentMethod])

  const fetchListMethod = async () => {
    try {
      const response = await fetchPaymentDestination()
      const data = await response.data
      if (!data) return
      setListMethod(data?.items)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchUserCoupons = async () => {
    try {
      const response = await getCustomerCoupon()
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data

      // Remove duplicate coupons based on couponId
      const uniqueCoupons = data.filter(
        (value, index, self) => index === self.findIndex((t) => t.couponId === value.couponId)
      )

      setCoupons(uniqueCoupons)
    } catch (error) {
      console.error('Error fetching customer coupons:', error)
    }
  }

  const fetchMerchantId = async () => {
    try {
      const response = await fetchMerchantPaging()
      const data = await response.data
      if (data?.items) {
        const merchant = data.items.find((item) => item.merchantReturnUrl.includes(baseUrl))
        if (merchant) setMerchantId(merchant.id)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchUserCoupons()
    fetchListMethod()
    fetchMerchantId()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form Data:', values)
    const cartId = localStorage.getItem('cartId')
    if (!cartId) {
      return
    }

    const payload = {
      mealId: cartId,
      tableId: null,
      orderType: orderType,
      customerName: values.name,
      customerPhone: values.phone,
      shippingAddress: orderType === 1 ? 'tại quán' : values.address || '',
      couponId: selectedCouponId
    }
    console.log(payload)
    try {
      const response = await postOrder(payload)
      const data = await response.data
      console.log(data)
      localStorage.removeItem('cartId')
      toast.success('Order successfully', {
        autoClose: 1000
      })
      if (orderType === 2) {
        const paymentPayload = {
          paymentContent: values.contentPayment || 'khong co noi dung',
          paymentCurrency: 'VND',
          requiredAmount: data.totalAmount,
          paymentLanguage: 'VN',
          orderId: data.id,
          merchantId: merchantId,
          paymentDestinationId: payMentMethod,
          paymentDesname: listMethod.find((item) => item.id === payMentMethod)?.desName || ''
        }
        console.log(paymentPayload)
        const paymentResponse = await fetchPayment(paymentPayload)
        const paymentData = await paymentResponse.data
        console.log(paymentData)
        window.location.href = paymentData.paymentUrl
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4 flex flex-col justify-center'>
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='Enter your phone number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        {orderType == 2 && (
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your address' {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className='flex flex-row gap-3'>
          <Select onValueChange={(value) => setPayMentMethod(value)}>
            <SelectTrigger className='w-[260px]'>
              <SelectValue placeholder='Chọn hình thức thanh toán' />
            </SelectTrigger>
            <SelectContent className='bg-[#fff]'>
              {listMethod.map((item: paymentItem) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.desShortName}
                </SelectItem>
              ))}
              {orderType == 1 && <SelectItem value='thanh toán tại quầy'>thanh toán tại quầy</SelectItem>}
            </SelectContent>
          </Select>
          {/* Coupon Selection */}
          <Select onValueChange={(value) => setSelectedCouponId(value)}>
            <SelectTrigger className='w-[260px]'>
              <SelectValue placeholder='Chọn coupon' />
            </SelectTrigger>
            <SelectContent className='bg-[#fff]'>
              {coupons.map((coupon, index) => (
                <SelectItem key={index} value={coupon.couponId}>
                  {coupon.couponCode} - Giảm {coupon.discountAmount} VND
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type='submit' className='bg-[#0765ff] text-[#fff] w-full'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default OrderForm
