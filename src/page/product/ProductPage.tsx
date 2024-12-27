import { fetchFilterProduct, fetchProduct } from '@/apis/productApi'
import { Pagination } from '@/components'
import { FilterProduct, ProductList } from '@/components/listProduct'
import { Product } from '@/types'
import { useEffect, useState } from 'react'

export const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)

  // Fetch all products
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setNoResults(false)
    try {
      const response = await fetchProduct({ PageNumber: currentPage, PageSize: pageSize })
      if (response && response.success) {
        const data = await response.data
        setProducts(data.items || [])
        setTotalItems(data?.totalRecord || undefined)
      } else {
        setProducts([])
        setNoResults(true)
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
      const response = await fetchFilterProduct({
        Inactive: true,
        PageNumber: currentPage,
        PageSize: pageSize,
        ...newFilters
      })
      if (response && response.success) {
        const data = await response.data
        if (data.items.length > 0) {
          setFilterProducts(data.items)
          setTotalItems(data?.totalRecord || undefined)
        } else {
          setFilterProducts([])
          setNoResults(true)
        }
        setIsFiltered(true)
      } else {
        setFilterProducts([])
        setNoResults(true)
        setIsFiltered(true)
      }
    } catch (err) {
      setError('An error occurred while applying filters.')
      console.error('Error fetching filtered products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update data when page or page size changes
  useEffect(() => {
    if (isFiltered) {
      applyFilter({})
    } else {
      fetchData()
    }
  }, [currentPage, pageSize])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-3xl font-bold text-center my-8'>Danh sách sản phẩm</h1>
      <FilterProduct onApplyFilter={applyFilter} />

      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
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
          <h2 className='text-xl font-semibold'>Tất cả sản phẩm:</h2>
          {noResults ? (
            <p className='text-center text-gray-500'>Hiện không có sản phẩm.</p>
          ) : (
            <ProductList products={products} />
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
