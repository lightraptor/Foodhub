import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OrderForm from './OrderForm'
import { OrderFormDineIn } from './OrderFormDineIn'

const OrderTabs = ({ onOrder }: { onOrder: (value: number) => void }) => {
  return (
    <>
      <Tabs defaultValue='account' className='md:w-3/4 w-fullmd:mx-none mx-3 my-10 flex flex-col items-center'>
        <TabsList className='bg-[#e5e5e5] flex gap-2'>
          <TabsTrigger
            value='account'
            className='data-[state=active]:bg-[#0765ff] data-[state=active]:text-[#fff] rounded-md w-1/2 text-center'
            onClick={() => {
              onOrder(2)
            }}
          >
            Takeaway
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:bg-[#0765ff] data-[state=active]:text-[#fff] rounded-md w-1/2 text-center'
            value='password'
            onClick={() => {
              onOrder(1)
            }}
          >
            Dine In
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account' className='w-full'>
          <OrderForm orderType={2} />
        </TabsContent>
        <TabsContent className='w-full' value='password'>
          <OrderFormDineIn orderType={1} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default OrderTabs
