import { Button } from '@/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Minus, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CommentSection } from './CommentSection'
import { useNavigate, useParams } from 'react-router'
import { Product, Review } from '@/types'
import { fetchFilterProduct, fetchProductById } from '@/apis/productApi'
import { fetchReviewPagging, getAverageRating } from '@/apis/reviewApi'
import { postMeal } from '@/apis/mealApi'
import { toast } from 'react-toastify'

// const relatedProducts = [
//   {
//     id: '1',
//     name: 'Cơm gà',
//     price: 30000,
//     thumbnail:
//       'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
//   },
//   {
//     id: '2',
//     name: 'Cơm sườn',
//     price: 35000,
//     thumbnail:
//       'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
//   },
//   {
//     id: '3',
//     name: 'Cơm chay',
//     price: 20000,
//     thumbnail:
//       'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
//   }
// ]

export function ProductDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productItem, setProductItem] = useState<Product>()
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [comments, setComments] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [numberReview, setNumberReview] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const fetchProduct = async ({ id }: { id: string }) => {
    try {
      const response = await fetchProductById({ id: id || '' })
      if (!response.success) {
        console.error(response.message)
        return
      }
      setProductItem(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  useEffect(() => {
    fetchRetatedProduct({ id: productItem?.menuDto.id || '' })
  }, [productItem?.menuDto.id])
  const fetchRetatedProduct = async ({ id }: { id: string }) => {
    try {
      const response = await fetchFilterProduct({ menuId: id, Inactive: true })
      if (!response.success) {
        console.error(response.message)
        return
      }
      setRelatedProducts(response.data.items)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const fetchAverageReview = async ({ id }: { id: string }) => {
    try {
      // Fetch comments from API
      const response = await getAverageRating(id || '')
      if (!response.success) {
        console.error(response.message)
        return
      }
      if (!response.data) {
        return
      }
      const data = await response.data
      setRating(data)

      console.log(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const addToCart = async (): Promise<boolean> => {
    try {
      const response = await postMeal({ productId: id || '', quantity })
      const data = await response.data
      if (!response.success) {
        console.error(response.message)
        toast.error('Thêm vào giỏ hàng thất bại!', { autoClose: 3000 })
        return false
      }
      localStorage.setItem('cartId', data.id)
      toast.success(response.message, { autoClose: 3000 })
      return true
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại!', { autoClose: 3000 })
      return false
    }
  }

  const fetchListReviews = async ({ id }: { id: string }) => {
    try {
      // Fetch comments from API
      const response = await fetchReviewPagging({ ProductId: id })
      if (!response.success) {
        console.error(response.message)
        return
      }
      const data = await response.data
      console.log(data.items)
      setComments(data.items)
      setNumberReview(data.totalRecord)
      fetchAverageReview({ id })
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct({ id })
      fetchListReviews({ id })
      fetchAverageReview({ id })
    } else {
      console.error('No product ID provided')
    }
  }, [id])

  useEffect(() => {
    console.log(comments)
  }, [comments])

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
        {/* Image Section */}
        <div className='md:col-span-2 relative min-h-64 p-4 bg-white rounded-lg flex items-center justify-center'>
          <img
            src={productItem?.thumbnail || ''}
            alt={productItem?.name}
            className='rounded-lg w-full h-auto object-cover'
          />
        </div>

        {/* Product Details Section */}
        <div className='md:col-span-3 bg-white rounded-lg p-4'>
          {/* Breadcrumb */}
          <div className='mb-4'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>{productItem?.categoryDto.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>{productItem?.menuDto.menuName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{productItem?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Product Name and Pricing */}
          <h1 className='text-2xl md:text-3xl font-bold mb-4'>{productItem?.name}</h1>
          <div className='mb-4'>
            <span className='text-xl md:text-2xl font-semibold text-red-600'>
              {productItem?.sellingPrice.toLocaleString('vi-VN')} ₫
            </span>
            {productItem?.price !== productItem?.sellingPrice && (
              <span className='ml-2 text-gray-500 line-through'>{productItem?.price.toLocaleString('vi-VN')} ₫</span>
            )}
          </div>

          {/* Product Description */}
          <div className='mb-4'>
            <h2 className='text-lg md:text-xl font-bold'>Mô tả sản phẩm</h2>
            <div dangerouslySetInnerHTML={{ __html: productItem?.description || `` }} />
          </div>

          {/* Rating Section */}
          {rating > 0 ? (
            <div className='flex items-center gap-2 mb-2'>
              {rating.toFixed(1)} <Star className='text-yellow-400' />/
              <span className='text-sm text-gray-500'>{numberReview} đánh giá</span>
            </div>
          ) : (
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-sm text-gray-500'>hiện chưa có đánh giá</span>
            </div>
          )}

          {/* Quantity Selector */}
          <div className='mb-4 text-lg font-semibold'>
            <p>Số lượng</p>
            <div className='flex items-center space-x-2 my-4'>
              <Button variant='outline' size='icon' onClick={decrementQuantity}>
                <Minus className='h-4 w-4' />
              </Button>
              <span className='font-semibold'>{quantity}</span>
              <Button variant='outline' size='icon' onClick={incrementQuantity}>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 w-full'>
            <button
              className='w-full sm:w-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className='w-full sm:w-1/2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300'
              onClick={async () => {
                const success = await addToCart()
                if (success) {
                  navigate('/order')
                }
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      {id !== undefined && (
        <CommentSection comments={comments} fetchData={() => fetchListReviews({ id })} productId={id} />
      )}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Sản phẩm liên quan</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className='bg-white rounded-lg p-4 shadow-md'>
              <img
                src={relatedProduct?.thumbnail}
                alt={relatedProduct.name}
                className='rounded-lg w-full h-40 object-cover mb-4'
              />
              <h3 className='text-lg font-semibold mb-2'>{relatedProduct.name}</h3>
              <p className='text-red-600 font-bold'>{relatedProduct.price.toLocaleString('vi-VN')} ₫</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
