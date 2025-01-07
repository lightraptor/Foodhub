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

interface responseVerify {
  isSuccess: boolean
  message: string
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
