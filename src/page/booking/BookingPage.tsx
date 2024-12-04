import { TableItem } from '@/types'
import { useState } from 'react'
import TableSelection from './components/TableSelection'
import BookingForm from './components/BookingForm'
import { useNavigate } from 'react-router'
import { postBooking } from '@/apis/bookingApi'
import { toast } from 'react-toastify'

export const BookingPage = () => {
  const [selectedTables, setSelectedTables] = useState<TableItem[]>([])
  const navigate = useNavigate()

  const handleTableSelect = async (table: TableItem) => {
    if (selectedTables.some((t) => t.id === table.id)) {
      setSelectedTables(selectedTables.filter((t) => t.id !== table.id))
    } else {
      setSelectedTables([...selectedTables, table])
    }
  }

  const handleBooking = async (formData: any) => {
    // Here you would typically send this data to your backend
    const handleIds = selectedTables.map((table) => table.id)
    console.log('Booking data:', { ...formData, handleIds: handleIds })
    try {
      // Here you would typically send this data to your backend
      const response = await postBooking({
        ...formData,
        tableIds: handleIds
      })
      const data = await response.data
      console.log(data)
      toast.success(response.message, { autoClose: 2000 })
      navigate('/')
      if (!response.success) {
        console.error(response.message)
        return
      }
    } catch (error) {
      console.error('Error sending booking data:', error)
    }
  }

  const handleCancel = () => {
    console.log('Booking cancelled')
    // Here you would typically redirect to the main booking page
    navigate('/')
  }

  return (
    <>
      <h1 className='text-4xl font-bold my-4 text-center'>Chọn bàn</h1>
      <div className='flex flex-col md:flex-row h-srceen'>
        <div className='w-full md:w-2/3 p-4 overflow-auto'>
          <TableSelection selectedTables={selectedTables} onSelectTable={handleTableSelect} />
        </div>
        <div className='w-full md:w-1/3 p-4 bg-[#f3f4f6] overflow-auto'>
          <BookingForm selectedTables={selectedTables} onBook={handleBooking} onCancel={handleCancel} />
        </div>
      </div>
    </>
  )
}
