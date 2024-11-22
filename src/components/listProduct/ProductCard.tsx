import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import bgImage from '@/assets/bg.png'

import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { postMeal } from '@/apis/mealApi'
import { toast } from 'react-toastify'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export function ProductCard({ product }: ProductCardProps) {
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
    toast.success(response.message, { autoClose: 3000 })

    console.log(`Added ${quantity} ${product.name}(s) to cart`)
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer'>
      <div className='relative h-48 w-full'>
        <img src={product.thumbnail || bgImage} alt={product.name} className='w-full h-full object-cover' />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{product.description}</p>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-xl font-bold text-blue-600'>${product.sellingPrice.toFixed(2)}</span>
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
        <Button className='w-full' variant={'outline'} onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
