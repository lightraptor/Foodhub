export const AUTHENTICATION_ROUTES = {
  Home: { path: '/', label: 'Home' },
  Cart: { path: '/cart', label: 'Cart' },
  Order: { path: '/order', label: 'Order' }
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: { path: '/login', label: 'Login' },
  Register: { path: '/register', label: 'Register' }
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
