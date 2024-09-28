import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/frontend_assets/assets'
import Newsletter from '../components/Newsletter'
const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tittle text1={"CONTACT"} text2={"US"}/>
        <div className='flex flex-col md:flex-row text-sm mb-20 my-10 gap-10 justify-center'>
          <img className='w-full md:max-w-[450px]' src={assets.contact_img}/>
          <div className='flex flex-col justify-start items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500 text-start'>532401 Arasavelli Srikakulam <br/>Andhra Pradesh,India</p>
            <p className='text-gray-500 text-start'>Mob:6263915310 <br/>Email: MYSHOP@gmail.com</p>
            <p className='font-semibold text-xl text-gray-600 '>Carrers at MYSHOP</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore</button>
          </div>
        </div>
      </div>
      <Newsletter/>cd fronte
    </div>
  )
}

export default Contact