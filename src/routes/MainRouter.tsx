import { Layout } from '@/components'
import { ROUTES } from '@/defines'
import { useRouteRender } from '@/hooks'
import { BookingPage, LoginPage, PaymentPage, ProductDetailPage, ProductPage } from '@/page'
import CartPage from '@/page/cart/CartPage'
import OrderPage from '@/page/order/OrderPage'
import { RegisterPage } from '@/page/register'
import { CustomerProfile } from '@/page/user'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.Home.path,
      element: useRouteRender(
        <Layout>
          <BookingPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Login.path,
      element: useRouteRender(
        <Layout>
          <LoginPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Cart.path,
      element: useRouteRender(
        <Layout>
          <CartPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Register.path,
      element: useRouteRender(
        <Layout>
          <RegisterPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Order.path,
      element: useRouteRender(
        <Layout>
          <OrderPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Booking.path,
      element: useRouteRender(
        <Layout>
          <BookingPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Product.path,
      element: useRouteRender(
        <Layout>
          <ProductPage />
        </Layout>
      )
    },
    {
      path: ROUTES.user.path,
      element: useRouteRender(
        <Layout>
          <CustomerProfile />
        </Layout>
      )
    },
    {
      path: `${ROUTES.Product.path}/:id`,
      element: useRouteRender(
        <Layout>
          <ProductDetailPage />
        </Layout>
      )
    },
    {
      path: ROUTES.PaymentConfirm.path,
      element: useRouteRender(
        <Layout>
          <PaymentPage />
        </Layout>
      )
    }
  ])
  return <RouterProvider router={router} />
}
