import { OrderDetail } from '@/apis/orderApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ShoppingCart } from 'lucide-react'

interface OrderItemsProps {
  items: OrderDetail[]
}

export function OrderItems({ items }: OrderItemsProps) {
  const totalOrderPrice = items.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <Card className='bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'>
      <CardHeader className='bg-green-100 rounded-t-lg'>
        <CardTitle className='text-green-800 flex items-center'>
          <ShoppingCart className='w-5 h-5 mr-2' />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-green-800'>Product</TableHead>
              <TableHead className='text-green-800'>Unit</TableHead>
              <TableHead className='text-green-800'>Price</TableHead>
              <TableHead className='text-green-800'>Quantity</TableHead>
              <TableHead className='text-green-800'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className='hover:bg-green-100 transition-colors'>
                <TableCell className='text-green-700'>{item.productName}</TableCell>
                <TableCell className='text-green-700'>{item.unitName}</TableCell>
                <TableCell className='text-green-700'>{item.price.toLocaleString()} VND</TableCell>
                <TableCell className='text-green-700'>{item.quantity}</TableCell>
                <TableCell className='text-green-700'>{item.totalPrice.toLocaleString()} VND</TableCell>
              </TableRow>
            ))}
            <TableRow className='font-bold'>
              <TableCell colSpan={4} className='text-right text-green-800'>
                Total Order Price
              </TableCell>
              <TableCell className='text-green-800'>{totalOrderPrice.toLocaleString()} VND</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
