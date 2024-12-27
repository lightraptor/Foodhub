import { baseURL } from '@/constants'
import { TableItem } from '@/types'
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

export interface TableResponse {
  items: TableItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export const fetchGetTable = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<TableResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableResponse>> = await instance.get(`api/Table`, {
      params: {
        PageNumber,
        PageSize
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
