import { ThemeControl } from 'components'
import './styles/index.css'
import { MainRouter } from 'routes'

function App() {
  return (
    <>
      <div className='bg-baseBackground h-[100vh] w-[100vw]'>
        <ThemeControl />
        <p className='text-3xl text-primary text-center font-normal'>This is code base project</p>
        <MainRouter />
      </div>
    </>
  )
}

export default App
