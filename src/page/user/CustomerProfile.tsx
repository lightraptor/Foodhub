import React, { useState, useEffect } from 'react'
import { EditableCalendar, EditableField, EditableSelect } from './components'
import { getUserId, getUserProfile, postUserProfile, userProfile } from '@/apis/userApi'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'
import userImg from '@/assets/user.png'

export const CustomerProfile: React.FC = () => {
  const [customer, setCustomer] = useState<userProfile | null>(null)
  const [tempCustomer, setTempCustomer] = useState<userProfile | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userId, setUserId] = useState('')

  const fetchData = async () => {
    try {
      const response = await getUserId()
      if (!response) return
      setUserId(response)
      const userData = await getUserProfile({ userId: response })
      if (userData.success && userData.data) {
        setCustomer(userData.data)
      } else {
        setCustomer(null)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setCustomer(null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDialogOpen = () => {
    setTempCustomer({
      userId: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      birthday: new Date().toLocaleDateString(),
      phoneNumber: '',
      address: '',
      avatar: ''
    })
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  const handleDialogSave = async () => {
    if (tempCustomer) {
      const updatedCustomer = {
        UserId: userId, // You need to provide a value for UserId
        FirstName: tempCustomer.firstName,
        LastName: tempCustomer.lastName,
        Gender: tempCustomer.gender,
        Birthday: tempCustomer.birthday,
        PhoneNumber: tempCustomer.phoneNumber,
        Address: tempCustomer.address,
        File: selectedFile!,
        avatar: selectedFile ? URL.createObjectURL(selectedFile) : tempCustomer.avatar
      }
      try {
        const response = await postUserProfile(updatedCustomer)
        if (response.success) {
          fetchData()
        }
      } catch (error) {
        console.error('Error updating user profile:', error)
      }
      fetchData()
      setIsDialogOpen(false)
    }
  }

  const handleDialogCancel = () => {
    setTempCustomer(null)
    setSelectedFile(null)
    setIsDialogOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Thông tin cá nhân</h1>
      {customer ? (
        <Card className='w-full max-w-md mx-auto'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Thông tin người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4'>
              <img src={customer.avatar || userImg} alt='User Avatar' className='w-16 h-16 rounded-full object-cover' />
              <div>
                <h2 className='text-xl font-medium'>
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className='text-gray-500'>{customer.gender}</p>
              </div>
            </div>
            <p>
              <strong>Sinh nhật:</strong> {new Date(customer.birthday).toLocaleDateString('')}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {customer.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {customer.address}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className='w-full max-w-md mx-auto'>
          <CardHeader className='flex flex-row items-center gap-2'>
            <AlertTriangle className='h-6 w-6 text-yellow-500' />
            <CardTitle className='text-lg font-semibold text-yellow-700'>Cảnh báo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600'>
              Bạn chưa tạo thông tin cá nhân. Vui lòng thêm thông tin để hoàn thiện hồ sơ của bạn.
            </p>
          </CardContent>
          <CardFooter>
            <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white' onClick={handleDialogOpen}>
              Thêm thông tin cá nhân
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhập thông tin cá nhân</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-1 gap-4'>
            <EditableField
              label='First Name'
              value={tempCustomer?.firstName || ''}
              onChange={(value) => setTempCustomer({ ...tempCustomer!, firstName: value })}
            />
            <EditableField
              label='Last Name'
              value={tempCustomer?.lastName || ''}
              onChange={(value) => setTempCustomer({ ...tempCustomer!, lastName: value })}
            />
            <EditableSelect
              label='Gender'
              value={tempCustomer?.gender || 'Male'}
              onChange={(value) => setTempCustomer({ ...tempCustomer!, gender: value as 'Male' | 'Female' })}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
            />
            <EditableCalendar
              label='Birthday'
              value={tempCustomer?.birthday ? new Date(tempCustomer.birthday) : new Date()}
              onChange={(value) => {
                if (value !== undefined && value !== null)
                  setTempCustomer({ ...tempCustomer!, birthday: value.toLocaleDateString() })
              }}
            />
            <EditableField
              label='Phone Number'
              value={tempCustomer?.phoneNumber || ''}
              onChange={(value) => setTempCustomer({ ...tempCustomer!, phoneNumber: value })}
            />
            <EditableField
              label='Address'
              value={tempCustomer?.address || ''}
              onChange={(value) => setTempCustomer({ ...tempCustomer!, address: value })}
            />
            <div>
              <label className='block font-medium mb-2'>Upload Avatar</label>
              <input type='file' onChange={handleFileChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={handleDialogCancel}>
              Hủy
            </Button>
            <Button onClick={handleDialogSave}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
