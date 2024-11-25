import { fetchProduct } from '@/apis/productApi'
import { ProductList } from '@/components/listProduct'
import { Product } from '@/types'
import { useEffect, useState } from 'react'

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([])

  const fetchData = async () => {
    try {
      const response = await fetchProduct()
      const data = await response.data
      setProducts(data.items)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold text-center my-8'>Our Products</h1>
        <ProductList products={products} />
      </div>
    </>
  )
}
