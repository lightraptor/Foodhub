import { useState } from 'react'

import { ProductCard } from './ProductCard'

import { Product } from '@/types'
import { ProductDetailsDialog } from './ProductDetail'

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseDialog = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
      <ProductDetailsDialog product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseDialog} />
    </>
  )
}
