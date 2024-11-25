'use client'

import { DecreaseMeal, IncreaseMeal, MealProduct } from '@/apis/mealApi'
import { ColumnDef } from '@tanstack/react-table'
import { DeleteCardItemButton } from './DeleteCartButton'
import { formatToVND } from '@/constants'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns = (fetchData: () => Promise<void>): ColumnDef<MealProduct>[] => [
  {
    accessorKey: 'productDetail.thumbnail',
    header: 'Tên món ăn',
    cell: ({ row }) => {
      return (
        <img
          src={row.original.productDetail.thumbnail}
          alt={row.original.productDetail.name}
          className='w-16 h-16 object-cover'
        />
      )
    }
  },
  {
    accessorKey: 'productDetail.name',
    header: 'Tên món ăn'
  },
  {
    accessorKey: 'productDetail.price',
    header: 'Đơn giá'
  },
  {
    accessorKey: 'quantity',
    header: () => <div className='text-left'>Số lượng</div>,
    cell: ({ row }) => {
      const mealId = localStorage.getItem('cartId')
      const handleDecrease = async () => {
        try {
          if (!mealId) {
            return
          }
          const payload = {
            mealId: mealId,
            mealProductId: row.original.id
          }
          const response = await DecreaseMeal(payload)
          if (!response.success) {
            return
          }

          fetchData()
          // Logic tang quantity
        } catch (error) {
          console.log(error)
        }
        console.log('Increase quantity for', row.original.id)
        console.log('Decrease quantity for', row.original.id)

        // Logic giảm quantity
      }

      const handleIncrease = async () => {
        try {
          if (!mealId) {
            return
          }
          const payload = {
            mealId: mealId,
            mealProductId: row.original.id
          }
          const response = await IncreaseMeal(payload)
          console.log(response.data)
          fetchData()
          // Logic tang quantity
        } catch (error) {
          console.log(error)
        }
        console.log('Increase quantity for', row.original.id)
        // Logic tăng quantity
      }

      return (
        <div className='flex items-center space-x-2'>
          <button onClick={handleDecrease} className='px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600'>
            -
          </button>
          <span className='w-8 text-center'>{row.original.quantity}</span>
          <button onClick={handleIncrease} className='px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600'>
            +
          </button>
        </div>
      )
    }
  },
  {
    accessorKey: 'price',
    header: 'Tổng tiền',
    cell: ({ row }) => {
      return (
        <div className='flex items-center space-x-2'>
          <span>{formatToVND(row.original.price)}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    cell: ({ row }) => {
      return (
        <div className='flex items-center space-x-2'>
          <DeleteCardItemButton mealId={row.original.id} fetchData={fetchData} />
        </div>
      )
    }
  }
]
