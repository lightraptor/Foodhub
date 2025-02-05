import { baseURL } from '@/constants'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'ngrok-skip-browser-warning': 'true'
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface paymentDestination {
  items: paymentItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export interface paymentItem {
  id: string
  desName: string
  desShortName: string
  desLogo: string
  desSortIndex: number
  isActive: boolean
}

export const fetchPaymentDestination = async (): Promise<ApiResponse<paymentDestination>> => {
  try {
    const response: AxiosResponse<ApiResponse<paymentDestination>> = await instance.get(
      `/api/payment-destination/paging`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
