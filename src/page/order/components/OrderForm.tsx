import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Define the schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name must be under 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone must have at least 10 digits')
    .max(15, 'Phone must be under 15 digits')
    .regex(/^\d+$/, 'Phone must contain only numbers'),
  address: z.string().min(5, 'Address must have at least 5 characters').max(100, 'Address must be under 100 characters')
})

const OrderForm = () => {
  //   const mealId = localStorage.getItem('cartId') || ''
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4 flex flex-col justify-center'>
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='Enter your phone number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter your address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type='submit' className='bg-[#0765ff] text-[#fff] w-full'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default OrderForm
