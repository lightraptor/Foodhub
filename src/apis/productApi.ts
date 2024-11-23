import { baseURL } from '@/constants'
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

interface ProductResponse {
  items: ProductItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

interface ProductItem {
  id: string
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string
  inactive: boolean
  menuDto: MenuDto
  categoryDto: CategoryDto
  productImagesDto: any
}

export interface MenuDto {
  id: string
  menuName: string
  description: string
}

export interface CategoryDto {
  id: string
  code: string
  name: string
  description: string
}

export const fetchProduct = async (): Promise<ApiResponse<ProductResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductResponse>> = await instance.get(`/api/Product/get-list`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
