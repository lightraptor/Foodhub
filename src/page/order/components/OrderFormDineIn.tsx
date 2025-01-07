import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { postOrder } from '@/apis/orderApi'
import { toast } from 'react-toastify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchGetTable } from '@/apis/tableApi'
import { TableItem } from '@/types'
import { useNavigate } from 'react-router'

type FormData = {
  name: string
  phone: string
  address?: string
  contentPayment?: string
}

type Errors = {
  name?: string
  phone?: string
  address?: string
}

export const OrderFormDineIn = ({ orderType }: { orderType: number }) => {
  const navigation = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    contentPayment: ''
  })
  const [errors, setErrors] = useState<Errors>({})
  const [listTable, setListTable] = useState<TableItem[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('')

  useEffect(() => {
    fetchTableList()
  }, [])

  const fetchTableList = async () => {
    try {
      const response = await fetchGetTable({ PageNumber: 1, PageSize: 1000 })
      const data = await response.data
      if (data) setListTable(data?.items)
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    if (!formData.name || formData.name.length < 2 || formData.name.length > 50) {
      newErrors.name = 'Name must be between 2 and 50 characters.'
    }

    if (!formData.phone || !/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be a number between 10 and 15 digits.'
    }

    if (orderType === 2 && (!formData.address || formData.address.length < 5 || formData.address.length > 100)) {
      newErrors.address = 'Address must be between 5 and 100 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const cartId = localStorage.getItem('cartId')
    if (!cartId) return

    const payload = {
      mealId: cartId,
      tableId: orderType === 1 ? selectedTable : '',
      orderType,
      customerName: formData.name,
      customerPhone: formData.phone,
      shippingAddress: orderType === 1 ? 'tại quán' : formData.address || '',
      discountAmount: 0,
      couponId: null
    }

    try {
      const response = await postOrder(payload)
      if (!response.success) {
        console.error(response.message)
        return
      }
      toast.success('Order successfully', { autoClose: 1000 })
      navigation('/product')
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  return (
    <form onSubmit={onSubmit} className='w-full space-y-4 flex flex-col justify-center'>
      <div>
        <label>Name</label>
        <Input name='name' placeholder='Enter your name' value={formData.name} onChange={handleInputChange} />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}
      </div>

      <div>
        <label>Phone</label>
        <Input name='phone' placeholder='Enter your phone number' value={formData.phone} onChange={handleInputChange} />
        {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
      </div>

      {orderType === 2 && (
        <div>
          <label>Address</label>
          <Input
            name='address'
            placeholder='Enter your address'
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <p className='text-red-500'>{errors.address}</p>}
        </div>
      )}

      {orderType === 1 && (
        <Select onValueChange={setSelectedTable}>
          <SelectTrigger className='w-[260px]'>
            <SelectValue placeholder='Chọn bán' />
          </SelectTrigger>
          <SelectContent className='bg-[#fff]'>
            {listTable.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button type='submit' className='bg-[#0765ff] text-[#fff] w-full'>
        Submit
      </Button>
    </form>
  )
}
