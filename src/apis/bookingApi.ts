import { baseURL } from '@/constants'
import { BookingItem } from '@/types'
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

interface PostBooking {
  tableIds: string[]
  peopleCount: number
  notes: string
  checkinTime: string
  customerName: string
  phone: string
}

export const postBooking = async ({
  tableIds,
  peopleCount,
  notes,
  checkinTime,
  customerName,
  phone
}: PostBooking): Promise<ApiResponse<BookingItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingItem>> = await instance.post(`/api/booking`, {
      tableIds,
      peopleCount,
      notes,
      checkinTime,
      customerName,
      phone
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const getBooking = async ({ id }: { id: string }): Promise<ApiResponse<BookingItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingItem>> = await instance.get(`/api/booking/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
