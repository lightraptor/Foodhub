import { baseURL } from '@/constants'
import { Coupon } from '@/types'
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

interface CouponResponse {
  items: Coupon[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

export const getAllCoupon = async (params: {
  PageNumber: number
  PageSize: number
}): Promise<ApiResponse<CouponResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<CouponResponse>> = await instance.get('/api/Coupon/get-list', {
      params
    })
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}
