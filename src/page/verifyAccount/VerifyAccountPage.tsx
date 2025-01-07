import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { postVerify } from '@/apis/userApi'
import { toast } from 'react-toastify'
import { ROUTES } from '@/defines'

export const VerifyAccountPage = () => {
  const [verificationCode, setVerificationCode] = useState('')
  const email = localStorage.getItem('confirmEmail') || ''
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý logic xác minh
    try {
      const res = await postVerify({ email: email, code: verificationCode })
      if (res.isSuccess) {
        localStorage.removeItem('confirmEmail')
        toast.success(res.message, { autoClose: 3000 })
        navigate(ROUTES.Login.path)
      } else {
        console.error('Registration failed:', res?.message)
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error?.response?.data, { autoClose: 3000 })
    }
    console.log('Verification code submitted:', verificationCode)
  }
  return (
    <>
      {email === undefined || email === null || email === '' ? (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle className='flex items-center text-red-600'>
                <AlertCircle className='mr-2' />
                Lỗi Xác Minh
              </CardTitle>
              <CardDescription>Không thể xác minh tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center mb-4'>
                Rất tiếc, chúng tôi không thể tìm thấy email cần xác minh. Có thể bạn đã truy cập trang này một cách
                không chính xác.
              </p>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Link to='/register'>
                <Button>Quay lại đăng kí</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle>Xác minh Email</CardTitle>
              <CardDescription>Nhập mã xác minh được gửi đến email của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' type='email' value={email} disabled />
                </div>
                <div className='mb-4'>
                  <Label htmlFor='verificationCode'>Mã xác minh</Label>
                  <Input
                    id='verificationCode'
                    type='text'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder='Nhập mã xác minh'
                    required
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Xác minh
                </Button>
              </form>
            </CardContent>
            <CardFooter className='text-sm text-gray-500 text-center'>
              Không nhận được mã?{' '}
              <a href='#' className='text-blue-500 hover:underline'>
                Gửi lại
              </a>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
