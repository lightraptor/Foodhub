import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { DeleteItemMeal } from '@/apis/mealApi'

interface DeleteCategoryButtonProps {
  mealId: string
  fetchData: () => Promise<void>
}

export function DeleteCardItemButton({ mealId, fetchData }: DeleteCategoryButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const cartId = localStorage.getItem('cartId') || ''

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const payload = {
        mealId: cartId,
        mealProductId: mealId
      }
      const response = await DeleteItemMeal(payload)
      if (!response) {
        throw new Error('Failed to delete category')
      }
      fetchData()
      toast(`Đã xóa sản phẩm thành công`, {
        type: 'success',
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      console.error('Error deleting category:', error)
      toast('Xóa sản phẩm thất bại, vui lòng thử lại', {
        type: 'error',
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button size='icon' onClick={() => setOpen(true)}>
        <Trash2 className='h-4 w-4 text-[#FF0000]' />
        <span className='sr-only'>Delete</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-[#fff] border-none'>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>Bạn có chắc chắn muốn xóa sản phẩm này ?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)} disabled={isDeleting}>
              Hủy
            </Button>
            <Button
              className='bg-[#FF0000] text-[#fff]'
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
