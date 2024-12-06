import { fetchGetTable } from '@/apis/tableApi'
import { Button, Pagination } from '@/components'
import { TableItem } from '@/types'
import { MapPin, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

type Props = {
  onSelectTable: (table: TableItem) => void
  selectedTables: TableItem[]
}

export default function TableSelection({ onSelectTable, selectedTables }: Props) {
  const [tables, setTables] = useState<TableItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)

      const response = await fetchGetTable({ PageNumber: page, PageSize: size })
      if (!response.success) {
        throw new Error('Failed to fetch menu')
      }
      const data = response.data
      setTables(data?.items.filter((item) => item.status === 'Có thể đặt bàn') || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching menu:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }
  if (loading) return <p className='text-center text-lg'>Loading...</p>
  return (
    <>
      <Drawer direction='left'>
        <DrawerTrigger>
          <Button type='button' className='w-full my-3'>
            Chọn bàn
          </Button>
        </DrawerTrigger>
        <DrawerContent className='h-full md:w-3/4 w-[90%] p-4'>
          <DrawerHeader>
            <DrawerTitle>Mời bạn chọn bàn</DrawerTitle>
            <DrawerDescription>danh sách bàn được hiển thị dưới đây</DrawerDescription>
          </DrawerHeader>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tables.length > 0 ? (
              tables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => table.isAvailable && onSelectTable(table)}
                  className={`w-full text-left rounded-lg shadow-md transition-all duration-300 ${
                    table.status === 'Có thể đặt bàn'
                      ? selectedTables.some((t) => t.id === table.id)
                        ? 'bg-[#2563eb] text-[#fff] transform scale-105'
                        : 'bg-[#fff] hover:bg-[#2563eb] hover:text-[#eff6ff] hover:shadow-lg'
                      : 'bg-[#fee2e2] cursor-not-allowed opacity-60'
                  }`}
                  disabled={table.status !== 'Có thể đặt bàn'}
                >
                  <div className='p-4'>
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-lg font-semibold'>{table.name}</h3>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm flex flex-row items-center gap-2'>
                        <span className='font-medium '>
                          <Users />
                        </span>{' '}
                        {table.maxCapacity} người
                      </p>
                      <p className='text-sm flex flex-row items-center gap-2'>
                        <span className='font-medium'>
                          <MapPin />
                        </span>{' '}
                        {table.areaName}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className='text-center my-10 font-medium text-lg'>Hiện đang hết bàn</p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            disableDisplayTotal
          />
          <DrawerFooter>
            <DrawerClose>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
