import { Layout } from '@/components'
import { ROUTES } from '@/defines'
import { useRouteRender } from '@/hooks'
import {
  BookingPage,
  CustomerCouponPage,
  HistoryPage,
  HomePage,
  LoginPage,
  PaymentPage,
  ProductDetailPage,
  ProductPage
} from '@/page'
import CartPage from '@/page/cart/CartPage'
import CouponPage from '@/page/coupon/CouponPage'
import OrderPage from '@/page/order/OrderPage'
import { RegisterPage } from '@/page/register'
import { CustomerProfile } from '@/page/user'
import { HistoryOrderPage } from '@/page/history-order'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.History.path,
      element: useRouteRender(
        <Layout>
          <HistoryPage />
        </Layout>
      )
    },
    {
      path: ROUTES.History.path,
      children: [
        {
          index: true,
          element: useRouteRender(
            <Layout>
              <HistoryPage />
            </Layout>
          )
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <HistoryOrderPage />
            </Layout>
          )
        }
      ]
    },
    {
      path: ROUTES.Home.path,
      element: useRouteRender(
        <Layout>
          <HomePage />
        </Layout>
      )
    },
    {
      path: ROUTES.CustomerCoupon.path,
      element: useRouteRender(
        <Layout>
          <CustomerCouponPage />
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
      path: ROUTES.Coupon.path,
      element: useRouteRender(
        <Layout>
          <CouponPage />
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
