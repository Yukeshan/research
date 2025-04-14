import React from 'react'

import CategoryWrapper from '../category/CategoryWrapper';
import FeaturedSection from './FeaturedSection';
import Hero from '../../components/Hero';
import AboutSection from './AboutSection';



const Home = () => {
  return (
    <div className="container m-auto">
    <div className="flex flex-col items-center justify-center w-full py-20 ">
      <Hero/>
      <CategoryWrapper/>
    
    </div>

    {/* featured */}
    <FeaturedSection/>
    <AboutSection/>
   </div>
  )
}

export default Home