import React, { useState, useCallback } from 'react'
import { Avatar, EditableCalendar, EditableField, EditableSelect } from './components'

interface CustomerInfo {
  firstName: string
  lastName: string
  gender: 'Male' | 'Female'
  birthday: Date
  phoneNumber: string
  address: string
  avatar: string
}

export const CustomerProfile: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    birthday: new Date('1990-01-01'),
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    avatar: '/placeholder.svg?height=100&width=100'
  })

  const [tempCustomer, setTempCustomer] = useState<CustomerInfo>(customer)
  const [isEdited, setIsEdited] = useState(false)

  const handleChange = useCallback(
    (field: keyof CustomerInfo, value: any) => {
      setTempCustomer((prev) => {
        const newCustomer = { ...prev, [field]: value }
        setIsEdited(JSON.stringify(newCustomer) !== JSON.stringify(customer))
        return newCustomer
      })
    },
    [customer]
  )

  const handleSave = () => {
    setCustomer(tempCustomer)
    setIsEdited(false)
  }

  const handleCancel = () => {
    setTempCustomer(customer)
    setIsEdited(false)
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Customer Profile</h1>
      <div className='bg-white shadow rounded-lg p-6'>
        <div className='flex items-center space-x-6 mb-4'>
          <Avatar url={tempCustomer.avatar} onUpload={(url) => handleChange('avatar', url)} />
          <div>
            <h2 className='text-xl font-medium'>
              {tempCustomer.firstName} {tempCustomer.lastName}
            </h2>
            <p className='text-gray-500'>{tempCustomer.gender}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <EditableField
            label='First Name'
            value={tempCustomer.firstName}
            onChange={(value) => handleChange('firstName', value)}
          />
          <EditableField
            label='Last Name'
            value={tempCustomer.lastName}
            onChange={(value) => handleChange('lastName', value)}
          />
          <EditableSelect
            label='Gender'
            value={tempCustomer.gender}
            onChange={(value) => handleChange('gender', value as 'Male' | 'Female')}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' }
            ]}
          />
          <EditableCalendar
            label='Birthday'
            value={tempCustomer.birthday}
            onChange={(value) => handleChange('birthday', value || new Date())}
          />
          <EditableField
            type='tel'
            label='Phone Number'
            value={tempCustomer.phoneNumber}
            onChange={(value) => handleChange('phoneNumber', value)}
          />
          <EditableField
            label='Address'
            value={tempCustomer.address}
            onChange={(value) => handleChange('address', value)}
          />
        </div>
        {isEdited && (
          <div className='mt-4 flex justify-end space-x-2'>
            <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300' onClick={handleCancel}>
              Cancel
            </button>
            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600' onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
