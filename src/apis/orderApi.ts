import { baseURL } from '@/constants'
import axios, { AxiosResponse } from 'axios'
import { OrderHistoryItem } from '@/types'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'ngrok-skip-browser-warning': 'true'
  }
})

interface orderPost {
  mealId: string
  tableId: null | string
  orderType: number
  customerName: string
  customerPhone: string
  shippingAddress: string
  couponId: string | null
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface CustomerOrderResponse {
  items: OrderHistoryItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
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
  createAt: string
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

export const getCustomerOrder = async ({
  userId
}: {
  userId: string
  OrderStatus?: string
  SortBy?: number
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<CustomerOrderResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<CustomerOrderResponse>> = await instance.get(
      '/api/order/customer/get-orders-paging',
      {
        params: {
          userId
        }
      }
    )
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getOrderDetail = async ({ orderId }: { orderId: string }): Promise<OrderDetail[]> => {
  try {
    const response: AxiosResponse<OrderDetail[]> = await instance.get(`/api/order-detail/${orderId}`)
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}
