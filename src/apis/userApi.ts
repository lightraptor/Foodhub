import { baseURL } from '@/constants'
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

export interface userProfile {
  userId: string
  firstName: string
  lastName: string
  gender: 'Male' | 'Female'
  birthday: string
  phoneNumber: string
  address: string
  avatar: any
}

interface responseVerify {
  isSuccess: boolean
  message: string
}

interface customerPost {
  UserId: string
  FirstName: string
  LastName: string
  Gender: string
  Birthday: string
  PhoneNumber: string
  Address: string
  File: File
}

export const postVerify = async ({ email, code }: { email: string; code: string }): Promise<responseVerify> => {
  try {
    const response: AxiosResponse<responseVerify> = await instance.post('/api/Account/verify-email', {
      email,
      code
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const getUserId = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await instance.get(`/api/user/current-user`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const getUserProfile = async ({ userId }: { userId: string }): Promise<ApiResponse<userProfile>> => {
  try {
    const response: AxiosResponse<ApiResponse<userProfile>> = await instance.get(
      `/api/user-profile/userId?userId=${userId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postUserProfile = async (profile: customerPost): Promise<ApiResponse<userProfile>> => {
  try {
    const formData = new FormData()

    // Thêm các trường vào formData
    formData.append('UserId', profile.UserId)
    formData.append('FirstName', profile.FirstName)
    formData.append('LastName', profile.LastName)
    formData.append('Gender', profile.Gender)
    formData.append('Birthday', profile.Birthday)
    formData.append('PhoneNumber', profile.PhoneNumber)
    formData.append('Address', profile.Address)

    // Kiểm tra và thêm file avatar vào formData nếu có
    if (profile.File) {
      formData.append('File', profile.File)
    }

    // Gửi yêu cầu POST với nội dung formData
    const response: AxiosResponse<ApiResponse<userProfile>> = await instance.post(
      '/api/user-profile/customer',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data' // Đảm bảo rằng header là multipart/form-data
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error posting user profile:', error)
    throw error
  }
}
