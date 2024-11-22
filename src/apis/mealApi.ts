import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: `https://192.168.12.210:7143`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('accessToken')}`
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface Meal {
  id: string
  totalPrice: number
  products: MealProduct[]
  createdDate: Date
}

export interface MealProduct {
  id: string
  productDetail: Product
  quantity: number
  price: number
}

export interface Product {
  id: string
  code: string
  name: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string
}

export const getMeal = async (id: string): Promise<ApiResponse<Meal[]>> => {
  const response: AxiosResponse<ApiResponse<Meal[]>> = await instance.get(`/api/Meal?id=${id}`)
  return response.data
}

export const postMeal = async ({
  productId,
  quantity
}: {
  productId: string
  quantity: number
}): Promise<ApiResponse<Meal>> => {
  try {
    const response: AxiosResponse<ApiResponse<Meal>> = await instance.post(`/api/Meal`, {
      productId,
      quantity
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
