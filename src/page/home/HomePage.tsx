import { fetchFilterProduct, fetchProduct } from '@/apis/productApi'
import { FilterProduct, ProductList } from '@/components/listProduct'
import { Product } from '@/types'
import { useEffect, useState } from 'react'

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false) // Trạng thái riêng cho không tìm thấy kết quả

  // Fetch all products
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setNoResults(false)
    try {
      const response = await fetchProduct()
      if (response && response.success) {
        const data = await response.data
        setProducts(data.items || [])
      } else {
        setProducts([])
        setNoResults(true) // Không có sản phẩm
      }
    } catch (err) {
      setError('An error occurred while fetching products.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Apply filters to fetch filtered products
  const applyFilter = async (newFilters: {
    SearchText?: string
    PriceFrom?: number
    PriceTo?: number
    CategoryId?: string
    MenuId?: string
  }) => {
    setLoading(true)
    setError(null)
    setNoResults(false)
    try {
      const response = await fetchFilterProduct({ Inactive: true, ...newFilters })
      if (response && response.success) {
        const data = await response.data
        if (data.items.length > 0) {
          setFilterProducts(data.items)
        } else {
          setFilterProducts([])
          setNoResults(true) // Không tìm thấy kết quả
        }
        setIsFiltered(true)
      } else {
        setFilterProducts([])
        setNoResults(true) // Không tìm thấy kết quả
        setIsFiltered(true)
      }
    } catch (err) {
      setError('An error occurred while applying filters.')
      console.error('Error fetching filtered products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold text-center my-8'>Our Products</h1>
      <FilterProduct onApplyFilter={applyFilter} />

      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>No results found.</p>
      ) : isFiltered ? (
        <>
          <h2 className='text-xl font-semibold'>Search Results:</h2>
          {noResults ? (
            <p className='text-center text-gray-500'>No results found.</p>
          ) : (
            <ProductList products={filterProducts} />
          )}
        </>
      ) : (
        <>
          <h2 className='text-xl font-semibold'>All Products:</h2>
          {noResults ? (
            <p className='text-center text-gray-500'>No products available.</p>
          ) : (
            <ProductList products={products} />
          )}
        </>
      )}
    </div>
  )
}
