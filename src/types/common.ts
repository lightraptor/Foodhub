export interface Product {
  id: string
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string | null
  inactive: boolean
  menuDto: {
    id: string
    menuName: string
    description: string
  }
  categoryDto: {
    id: string
    code: string
    name: string
    description: string
  }
  productImagesDto: string[] | null
}

export interface MealProps {
  id: string
  totalPrice: number
  products: MealList[]
  createdDate: Date
}

export interface MealList {
  id: string
  quantity: number
  price: number
  productDetail: MealistDetail
}

export interface MealistDetail {
  id: string
  code: string
  name: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string
}

export type Menu = {
  id: string
  menuName: string
  description: string
  inactive: boolean
  sortOrder: number
  imageUrl: string
}

export type Category = {
  id: string
  name: string
  code: string
  description: string
  inactive: boolean
}

export type TableItem = {
  id: string
  name: string
  maxCapacity: number
  status: string
  isAvailable: boolean
  areaName: string
}

export type BookingItem = {
  id: string
  peopleCount: number
  status: string
  notes: string
  bookingDate: string
  checkinTime: string
  customerId: any
  customerName: string
  phone: string
  tables: Table[]
}

export type Table = {
  tableId: string
  name: string
  areaName: string
}
