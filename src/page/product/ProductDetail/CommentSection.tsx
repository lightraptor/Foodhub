import { Star } from 'lucide-react'
import React, { useState } from 'react'

interface Comment {
  id: number
  name: string
  rating: number
  comment: string
}

interface CommentSectionProps {
  comments: Comment[]
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export const CommentSection = ({ comments, setComments }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(0)

  const handleAddComment = () => {
    if (newComment && rating > 0) {
      const newEntry = {
        id: comments.length + 1,
        name: 'User',
        rating,
        comment: newComment
      }
      setComments([...comments, newEntry])
      setNewComment('')
      setRating(0)
    }
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Bình luận</h2>

      {/* Comment Input */}
      <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Viết bình luận</h3>

        {/* Rating Input */}
        <div className='flex items-center mb-4'>
          <span className='mr-2'>Đánh giá:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Comment Input Box */}
        <textarea
          className='w-full p-2 border rounded-lg mb-4'
          rows={4}
          placeholder='Viết bình luận của bạn...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button
          onClick={handleAddComment}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
        >
          Gửi bình luận
        </button>
      </div>

      {/* Display Comments */}
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4'>Các bình luận</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className='border-b border-gray-200 pb-4 mb-4'>
              <div className='flex items-center mb-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className='font-semibold'>{comment.name}</p>
              <p className='my-2'>{comment.comment}</p>
              <p className='font-light text-sm text-gray-500 my-2'>19:00 23/05/2023</p>
            </div>
          ))
        ) : (
          <p>Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  )
}
