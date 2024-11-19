import { MENU } from 'defines'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <p>Home</p>
      <Link to={MENU.About}>About</Link>
    </>
  )
}
