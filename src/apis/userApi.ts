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

export const getUserId = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await instance.get(`/api/user/current-user`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
