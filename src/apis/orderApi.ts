import { baseURL } from '@/constants'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

interface orderPost {
  mealId: string
  tableId: null | string
  orderType: number
  customerName: string
  customerPhone: string
  shippingAddress: string
  couponId: string
}

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

export const postOrder = async ({
  mealId,
  tableId,
  orderType,
  customerName,
  customerPhone,
  shippingAddress,
  couponId
}: orderPost): Promise<ApiResponse<OrderResponse>> => {
  const paypoad = {
    mealId,
    tableId,
    orderType,
    customerName,
    customerPhone,
    shippingAddress,
    couponId
  }
  try {
    const response: AxiosResponse<ApiResponse<OrderResponse>> = await instance.post(`/api/order`, paypoad)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
