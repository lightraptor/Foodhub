import { baseURL } from '@/constants'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('accessToken')}`
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface OrderResponse {
  id: string
  bookingId: any
  orderType: number
  orderTypeName: string
  orderStatus: string
  createdDate: string
  shippingDate: string
  customerId: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  deliveryAmount: number
  depositAmount: number
  discountAmount: number
  totalAmount: number
  orderDetails: OrderDetail[]
}

export interface OrderDetail {
  id: string
  orderId: string
  productId: string
  productName: string
  unitName: string
  price: number
  quantity: number
  totalPrice: number
}

export const postMeal = async ({
  productId,
  quantity
}: {
  productId: string
  quantity: number
}): Promise<ApiResponse<Meal>> => {
  try {
    const response: AxiosResponse<ApiResponse<Meal>> = await instance.post(`/api/Meal`, {
      productId,
      quantity
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
