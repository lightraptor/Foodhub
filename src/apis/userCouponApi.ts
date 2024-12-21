import { baseURL } from '@/constants'
import { UserCoupon } from '@/types'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export const getCustomerCoupon = async (): Promise<ApiResponse<UserCoupon[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<UserCoupon[]>> = await instance.get(
      '/api/user-coupon/get-all-user-coupon'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postReceiveCoupon = async ({ couponId }: { couponId: string }): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.post(
      `/api/user-coupon/receive-coupon?couponId=${couponId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
