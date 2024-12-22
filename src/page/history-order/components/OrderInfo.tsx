import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon, Users, Utensils, PhoneIcon, StickyNote } from 'lucide-react'

interface Table {
  tableId: string
  name: string
  areaName: string
}

interface OrderInfoProps {
  id: string
  peopleCount: number
  status: string
  notes: string
  bookingDate: string
  checkinTime: string
  customerId: string
  customerName: string
  phone: string
  tables: Table[]
}

export function OrderInfo({
  id,
  peopleCount,
  status,
  notes,
  bookingDate,
  checkinTime,
  customerName,
  phone,
  tables
}: OrderInfoProps) {
  return (
    <Card className='bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'>
      <CardHeader className='bg-blue-100 rounded-t-lg'>
        <CardTitle className='text-blue-800'>Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4'>
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-blue-800'>Order ID</p>
              <p className='text-sm text-blue-600'>{id}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-blue-800'>Status</p>
              <Badge variant={status === 'Complete' ? 'default' : 'secondary'} className='mt-1'>
                {status}
              </Badge>
            </div>
            <div>
              <p className='text-sm font-medium text-blue-800'>Customer</p>
              <p className='text-sm text-blue-600'>{customerName}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <PhoneIcon className='w-4 h-4 text-blue-500' />
              <p className='text-sm text-blue-600'>{phone}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <CalendarIcon className='w-4 h-4 text-blue-500' />
              <p className='text-sm text-blue-600'>{new Date(bookingDate).toLocaleString()}</p>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <ClockIcon className='w-4 h-4 text-blue-500' />
              <p className='text-sm text-blue-600'>{new Date(checkinTime).toLocaleString()}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Users className='w-4 h-4 text-blue-500' />
              <p className='text-sm text-blue-600'>{peopleCount} people</p>
            </div>
            <div>
              <div className='flex items-center space-x-2'>
                <Utensils className='w-4 h-4 text-blue-500' />
                <p className='text-sm font-medium text-blue-800'>Tables</p>
              </div>
              <ul className='list-disc list-inside text-sm text-blue-600 mt-1'>
                {tables.map((table) => (
                  <li key={table.tableId}>
                    {table.name} ({table.areaName})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className='flex items-center space-x-2'>
                <StickyNote className='w-4 h-4 text-blue-500' />
                <p className='text-sm font-medium text-blue-800'>Notes</p>
              </div>
              <p className='text-sm text-blue-600 mt-1'>{notes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
