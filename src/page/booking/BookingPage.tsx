import { TableItem } from '@/types'
import { useState } from 'react'
import BookingForm from './components/BookingForm'
import { useNavigate } from 'react-router'
import { postBooking } from '@/apis/bookingApi'
import { toast } from 'react-toastify'
import restaurantBg from '@/assets/bg-res.jpeg'

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
    try {
      // Here you would typically send this data to your backend
      const response = await postBooking({
        ...formData,
        tableIds: handleIds
      })
      const data = await response.data
      console.log(data)
      toast.success(response.message, { autoClose: 2000 })
      navigate('/product')
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
      <div id='table' className='flex flex-col-reverse md:flex-row h-srceen'>
        <div className='relative w-full md:w-1/2  overflow-auto h-[calc(100vh-4rem)] p-4'>
          <img src={restaurantBg} alt='' className='w-full h-full object-cover rounded-xl' />
          <div className='absolute inset-0 bg-[#000] opacity-50 rounded-xl m-4'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
            <p className=' text-white text-5xl font-bold text-center mb-2'>Foodhub</p>
            <p className='text-white text-xl text-center'>Good service - Good food - Good delivery</p>
          </div>
        </div>
        <div className='w-full md:w-1/2 p-4 bg-[#f3f4f6] overflow-auto'>
          <BookingForm
            selectedTables={selectedTables}
            onSelectTable={handleTableSelect}
            onBook={handleBooking}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  )
}
