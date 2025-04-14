import React from 'react'
import AboutImg from '../../assets/about-image.jpg'

const AboutSection = () => {
  return (
    <div className=" overflow-hidden flex md:flex-row flex-col justify-between items-center sm:my-20 my-4 md:gap-20 gap-12 px-5 xl:px-10">

      <div className="text-start md:w-1/2 lg:pr-40">
        <h2 className="text-3xl font-semibold text-secondary sm:text-5xl sm:leading-relaxed">
        Let's enjoy being a foodie who loves to experiment with recipes.
        </h2>
       
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex">

          </div>
        </div>
      </div>

      <div className='md:w-1/2'>
      
        <img
          src={AboutImg}
          className='rounded-3xl md:max-h-dvh'
        />
      </div>
    </div>
  )
}

export default AboutSection