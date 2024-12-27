import { baseURL } from '@/constants'
import { Review } from '@/types'
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

interface ResponseList {
  items: Review[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

interface PostResponse {
  reviewText: string
  rating: number
  productId: string
}

interface getAverageResponse {
  data: number
  message: string
  success: boolean
}

export const fetchReviewPagging = async ({
  ProductId,
  Rating,
  SoftBy,
  PageNumber,
  PageSize
}: {
  ProductId?: string
  Rating?: number
  SoftBy?: string
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<ResponseList>> => {
  try {
    const response: AxiosResponse<ApiResponse<ResponseList>> = await instance.get('/api/review/paging', {
      params: {
        ProductId,
        Rating,
        SoftBy,
        PageNumber,
        PageSize
      }
    })
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const createReview = async (review: PostResponse): Promise<ApiResponse<Review>> => {
  try {
    const response: AxiosResponse<ApiResponse<Review>> = await instance.post('/api/review', review)
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getAverageRating = async (productId: string): Promise<getAverageResponse> => {
  try {
    const response: AxiosResponse<getAverageResponse> = await instance.get(`/api/review/average/${productId}`)
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    throw error
  }
}
