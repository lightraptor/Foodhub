export const AUTHENTICATION_MENUS = {
  Home: { path: '/', label: 'Home' },
  Cart: { path: '/cart', label: 'Cart' },
  Order: { path: '/order', label: 'Order' }
}

export const UN_AUTHENTICATION_MENUS = {
  Login: { path: '/login', label: 'Login' },
  Register: { path: '/register', label: 'Register' }
}

export const MENUS = {
  ...AUTHENTICATION_MENUS,
  ...UN_AUTHENTICATION_MENUS
}
