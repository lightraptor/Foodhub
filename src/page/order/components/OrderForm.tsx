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

// Define the schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name must be under 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone must have at least 10 digits')
    .max(15, 'Phone must be under 15 digits')
    .regex(/^\d+$/, 'Phone must contain only numbers'),
  address: z.string().min(5, 'Address must have at least 5 characters').max(100, 'Address must be under 100 characters')
})

const OrderForm = () => {
  const [listMethod, setListMethod] = React.useState<paymentItem[]>([])
  const [payMentMethod, setPayMentMethod] = React.useState<string>('')
  const [merchantId, setMerchantId] = React.useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: ''
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

  const fetchMerchantId = async () => {
    try {
      const response = await fetchMerchantPaging()
      const data = await response.data
      if (!data) return
      setMerchantId(data?.items[0].id)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchListMethod()
    fetchMerchantId()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const cartId = localStorage.getItem('cartId')
    if (!cartId) {
      return
    }
    const payload = {
      mealId: cartId,
      tableId: null,
      orderType: 2,
      customerName: values.name,
      customerPhone: values.phone,
      shippingAddress: values.address,
      discountAmount: 0
    }
    try {
      const response = await postOrder(payload)
      const data = await response.data
      console.log(data)
      localStorage.removeItem('cartId')
      toast.success('Order successfully', {
        autoClose: 1000
      })
      const paymentPayload = {
        paymentContent: 'string',
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
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter your address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          </SelectContent>
        </Select>
        {/* Submit Button */}
        <Button type='submit' className='bg-[#0765ff] text-[#fff] w-full'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default OrderForm
