import React from 'react'
import Navbar from '../Navbar/Navbar'
// import Footer from '../Footer/Footer'
import HeroSlider from '../HeroSLider/HeroSlider'
import HeroVideo from '../HeroSLider/HeroVideo'
import Story from '../story/story'
import Masterpeace from '../Masterpeace/Masterpeace'
import BackgroundBg from '../BackgroundBg/BackgroundBg'
import ProductGrid from '../ProductGrid/ProductGrid'
import Testimonials from '../Testimonials/Testimonials'
import FloatButton from '../CTA/FloatButton'
import NewsLetter from '../NewsLetter/NewsLetter'
const Layout = () => {
  return (
   <>
   <Navbar/>
   <main className='min-h-screen'>
    <HeroSlider/>
    <HeroVideo/>
    <Story />
    <Masterpeace />
    <BackgroundBg />
    <ProductGrid />
    <Testimonials/>
    <FloatButton/>
    <NewsLetter/>
   </main>
   {/* <Footer/> */}
   </>
  )
}

export default Layout