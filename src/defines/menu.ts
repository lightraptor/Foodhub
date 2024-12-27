export const AUTHENTICATION_MENUS = {
  Home: { path: '/', label: 'Trang chủ' },
  Booking: { path: '/booking', label: 'Đặt bàn' },
  Product: { path: '/product', label: 'Sản phẩm' },
  Coupon: { path: '/coupon', label: 'Mã giảm giá' },
  Cart: { path: '/cart', label: 'Giỏ hàng' }
}

export const UN_AUTHENTICATION_MENUS = {
  Login: { path: '/login', label: 'Login' },
  Register: { path: '/register', label: 'Register' }
}

export const MENUS = {
  ...AUTHENTICATION_MENUS,
  ...UN_AUTHENTICATION_MENUS
}
