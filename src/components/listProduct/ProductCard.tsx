import { useState } from 'react'
import { Plus, Minus, Eye } from 'lucide-react'
import bgImage from '@/assets/bg.png'

import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { postMeal } from '@/apis/mealApi'
import { toast } from 'react-toastify'
import { formatToVND, renderStars } from '@/constants'
import { useNavigate } from 'react-router'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export function ProductCard({ product }: ProductCardProps) {
  const navigation = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const addToCart = async () => {
    // Add to cart logic here
    const response = await postMeal({ productId: product.id, quantity })
    const data = await response.data
    console.log(data)
    if (!response.success) {
      console.error(response.message)
      return
    }
    localStorage.setItem('cartId', data.id)
    toast.success(response.message, { autoClose: 3000 })
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 ease-in-out hover:scale-105'>
      <div
        className='relative h-48 w-full group'
        onClick={() => {
          navigation(`/product/${product.id}`)
        }}
      >
        <img
          src={product.thumbnail || bgImage}
          alt={product.name}
          className='w-full h-full object-cover transition duration-300 ease-in-out group-hover:opacity-50'
        />
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50'>
          <div className='text-white text-center flex flex-row gap-2 items-center justify-center'>
            <Eye className='w-8 h-8' />
            <p className='text-lg font-semibold'>Xem chi tiết</p>
          </div>
        </div>
      </div>
      <div className='p-4 flex flex-col h-[200px] justify-between'>
        <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
        <div className='flex flex-row items-center gap-2 mb-2'>{renderStars(5)}</div>
        <span className='text-sm text-gray-500'>50 lượt review</span>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-xl font-bold text-blue-600'>{formatToVND(product.sellingPrice)}</span>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='icon' onClick={decrementQuantity}>
              <Minus className='h-4 w-4' />
            </Button>
            <span className='font-semibold'>{quantity}</span>
            <Button variant='outline' size='icon' onClick={incrementQuantity}>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <Button className='w-full bg-[#0765ff] hover:bg-[#0765d1] text-[#fff]' onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
