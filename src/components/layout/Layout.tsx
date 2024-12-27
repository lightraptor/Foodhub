import { Footer, Navbar } from '@/components'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <Navbar />
      <main className='bg-[#f3f4f7] py-10'>{children}</main>
      <Footer />
    </div>
  )
}
