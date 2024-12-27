import { Star, StarOff } from 'lucide-react'

// export const baseURL = 'https://192.168.12.71:7143'

export const baseURL = 'https://8d81-171-240-141-139.ngrok-free.app'

export function formatToVND(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid input: amount must be a number.')
  }

  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND') // Thay thế ký hiệu ₫ bằng VND nếu cần
}

export const MerchantId = 'a74366c8-63e7-49ab-d47a-08dd0d4e1659'

export const renderStars = (rating: number) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? <Star key={i} className='text-yellow-400' /> : <StarOff key={i} className='text-gray-400' />
    )
  }
  return stars
}
