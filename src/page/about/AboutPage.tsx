import { MENUS } from '@/defines'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  return (
    <>
      <p>About</p>
      <Link to={MENUS.Home.path}>Home page</Link>
    </>
  )
}
