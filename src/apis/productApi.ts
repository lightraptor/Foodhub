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

export interface ProductFilter {
  searchText?: string
  priceFrom?: number
  priceTo?: number
  categoryId?: string
  menuId?: string
  Inactive?: boolean
  PageNumber?: number
  PageSize?: number
}

export const fetchProduct = async (params: {
  PageNumber: number
  PageSize: number
}): Promise<ApiResponse<ProductResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductResponse>> = await instance.get('/api/Product/get-list', {
      params
    })
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchFilterProduct = async (productFilter: ProductFilter): Promise<ApiResponse<ProductResponse>> => {
  const filteredParams = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(productFilter).filter(([key, value]) => value !== undefined && value !== null && value !== '')
  )
  try {
    const response: AxiosResponse<ApiResponse<ProductResponse>> = await instance.get(`/api/Product/filter`, {
      params: filteredParams
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const fetchProductById = async ({ id }: { id: string }): Promise<ApiResponse<ProductItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem>> = await instance.get(`/api/Product/${id}`)
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}
