export const AUTHENTICATION_ROUTES = {
  Home: { path: '/', label: 'Home' },
  Cart: { path: '/cart', label: 'Cart' },
  Order: { path: '/order', label: 'Order' },
  PaymentConfirm: {
    path: '/payment/confirm',
    label: 'PaymentConfirm'
  },
  Booking: { path: '/booking', label: 'Booking' },
  Product: { path: '/product', label: 'Product' },
  user: { path: '/user', label: 'User' },
  Coupon: { path: '/coupon', label: 'Coupon' },
  CustomerCoupon: { path: '/customer-coupon', label: 'CustomerCoupon' },
  History: { path: '/history', label: 'History' }
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: { path: '/login', label: 'Login' },
  Register: { path: '/register', label: 'Register' }
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
