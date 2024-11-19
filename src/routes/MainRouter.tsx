import { MENU } from 'defines'
import { AboutPage, HomePage } from 'page'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: MENU.Home,
      element: <HomePage />
    },
    {
      path: MENU.About,
      element: <AboutPage />
    }
  ])
  return <RouterProvider router={router} />
}
