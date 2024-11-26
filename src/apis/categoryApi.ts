import { baseURL } from '@/constants'
import { Category } from '@/types'
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

export const fetchActiveCategory = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Category[]>> = await instance.get(`/api/Category/active`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
