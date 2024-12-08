import { Button } from '@/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { renderStars } from '@/constants'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { CommentSection } from './CommentSection'

const product = {
  id: '8dae2dab-5560-42c5-a543-9e736876412e',
  code: 'EWRGS',
  name: 'Cơm tấm',
  description: '<p>ngon</p>',
  price: 25000,
  sellingPrice: 25000,
  unitName: 'Bát',
  thumbnail: 'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg',
  inactive: true,
  menuDto: {
    id: '10778fc6-27c8-45f8-8cbf-08dd15b0ba45',
    menuName: 'Ăn chính',
    description: 'ngon'
  },
  categoryDto: {
    id: 'bb71d0ec-99da-4239-0c0a-08dd15b11c7d',
    code: '#000345',
    name: 'Các loại cơm',
    description: 'ngon'
  },
  productImagesDto: []
}

const relatedProducts = [
  {
    id: '1',
    name: 'Cơm gà',
    price: 30000,
    thumbnail:
      'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
  },
  {
    id: '2',
    name: 'Cơm sườn',
    price: 35000,
    thumbnail:
      'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
  },
  {
    id: '3',
    name: 'Cơm chay',
    price: 20000,
    thumbnail:
      'http://res.cloudinary.com/dzrnjd4jt/image/upload/v1733461113/Restaurant/Product/viijepm7vnu65ztpnmvp.jpg'
  }
]

export function ProductDetailPage() {
  const [comments, setComments] = useState([
    { id: 1, name: 'Nguyen Van A', rating: 4, comment: 'Món ăn rất ngon!' },
    { id: 2, name: 'Tran Thi B', rating: 5, comment: 'Xuất sắc!' }
  ])

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
        {/* Image Section */}
        <div className='md:col-span-2 relative min-h-64 p-4 bg-white rounded-lg flex items-center justify-center'>
          <img src={product.thumbnail} alt={product.name} className='rounded-lg w-full h-auto object-cover' />
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
                  <BreadcrumbLink href='/'>{product.categoryDto.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>{product.menuDto.menuName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Product Name and Pricing */}
          <h1 className='text-2xl md:text-3xl font-bold mb-4'>{product.name}</h1>
          <div className='mb-4'>
            <span className='text-xl md:text-2xl font-semibold text-red-600'>
              {product.sellingPrice.toLocaleString('vi-VN')} ₫
            </span>
            {product.price !== product.sellingPrice && (
              <span className='ml-2 text-gray-500 line-through'>{product.price.toLocaleString('vi-VN')} ₫</span>
            )}
          </div>

          {/* Product Description */}
          <div className='mb-4'>
            <h2 className='text-lg md:text-xl font-bold'>Mô tả sản phẩm</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Rating Section */}
          <div className='flex items-center gap-2 mb-2'>
            {renderStars(5)}
            <span className='text-sm text-gray-500'>50 đánh giá</span>
          </div>

          {/* Quantity Selector */}
          <div className='mb-4 text-lg font-semibold'>
            <p>Số lượng</p>
            <div className='flex items-center space-x-2 my-4'>
              <Button variant='outline' size='icon'>
                <Minus className='h-4 w-4' />
              </Button>
              <span className='font-semibold'>1</span>
              <Button variant='outline' size='icon'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 w-full'>
            <button className='w-full sm:w-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300'>
              Thêm vào giỏ hàng
            </button>
            <button className='w-full sm:w-1/2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300'>
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection comments={comments} setComments={setComments} />
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Sản phẩm liên quan</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className='bg-white rounded-lg p-4 shadow-md'>
              <img
                src={relatedProduct.thumbnail}
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
