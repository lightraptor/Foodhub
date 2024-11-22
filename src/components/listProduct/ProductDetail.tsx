import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Product } from '@/types'
import { Button } from '../ui/button'
import bgImage from '@/assets/bg.png'

interface ProductDetailsDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsDialog({ product, isOpen, onClose }: ProductDetailsDialogProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-[#fff]'>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>
        <div className='grid md:grid-cols-2 gap-4 py-4'>
          <div className='space-y-4'>
            <div className='relative h-48 w-full'>
              <img
                src={product.thumbnail || bgImage}
                alt={product.name}
                className='rounded-md w-full h-full object-cover'
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <Button variant='outline' size='icon' onClick={decrementQuantity}>
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='font-semibold'>{quantity}</span>
                <Button variant='outline' size='icon' onClick={incrementQuantity}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <Button>Add to Cart</Button>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Code:</span>
              <span className='col-span-2'>{product.code}</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Description:</span>
              <span className='col-span-2'>{product.description}</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Price:</span>
              <span className='col-span-2'>{product.price} VND</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Selling Price:</span>
              <span className='col-span-2'>{product.sellingPrice} VND</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Unit:</span>
              <span className='col-span-2'>{product.unitName}</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Menu:</span>
              <span className='col-span-2'>{product.menuDto.menuName}</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-2'>
              <span className='font-semibold'>Category:</span>
              <span className='col-span-2'>{product.categoryDto.name}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
