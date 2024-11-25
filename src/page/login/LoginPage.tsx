import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormLogin } from '@/types'
import { useAuth } from '@/hooks'
import { Link } from 'react-router-dom'

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  })
  .required()

export const LoginPage = () => {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormLogin) => {
    login(data)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
        <h1 className='text-xl font-bold mb-2'>Login</h1>
        <p className='mb-2 text-sm'>
          Don't have an account?{' '}
          <Link to='/register'>
            <span className='text-[#007BFF]'> Sign up</span>
          </Link>
        </p>
        {/* Email Field */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password')}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-[#007BFF] text-[#fff] py-2 px-4 rounded hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
