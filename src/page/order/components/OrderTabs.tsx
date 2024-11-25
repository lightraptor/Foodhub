import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OrderForm from './OrderForm'

const OrderTabs = () => {
  return (
    <>
      <Tabs defaultValue='account' className='w-3/4 my-10 flex flex-col items-center'>
        <TabsList className='bg-[#e5e5e5] flex gap-2'>
          <TabsTrigger
            value='account'
            className='data-[state=active]:bg-[#0765ff] data-[state=active]:text-[#fff] rounded-md w-1/2 text-center'
          >
            Takeaway
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:bg-[#0765ff] data-[state=active]:text-[#fff] rounded-md w-1/2 text-center'
            value='password'
          >
            Dine In
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account' className='w-full'>
          <OrderForm />
        </TabsContent>
        <TabsContent className='w-full' value='password'>
          Tính năng đang trong giai đoạn phát triển
        </TabsContent>
      </Tabs>
    </>
  )
}

export default OrderTabs
