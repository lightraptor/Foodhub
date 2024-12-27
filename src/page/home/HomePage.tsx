import { HeroSection } from './components/HeroSection'
import { BookingPage } from '../booking'
import { AboutUs } from './components/AboutUs'
import FoodCarousel from './components/FoodCarousel'

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <FoodCarousel />
      <BookingPage />
    </>
  )
}
