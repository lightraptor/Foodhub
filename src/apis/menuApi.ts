import { baseURL } from '@/constants'
import { Menu } from '@/types'
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

export const fetchActiveMenu = async (): Promise<ApiResponse<Menu[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Menu[]>> = await instance.get(`/api/Menu/active`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
