export const baseURL = 'https://192.168.12.210:7143'

export function formatToVND(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid input: amount must be a number.')
  }

  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND') // Thay thế ký hiệu ₫ bằng VND nếu cần
}
