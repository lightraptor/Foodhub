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
