import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Tittle from './Tittle'

const OurPolicy = () => {
  return (
    <>
     <div className='text-center pt-8 text-3xl'>
     <Tittle text1={"OUR"} text2="POLICY"/>
     </div>
    
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center pt-12 text-xs sm:text-sm md:text-base text-gray-700 '>
        <div >
        <img src={assets.exchange_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Easy Exchange Policy </p>
        <p className='text-gray-400'> We offer free exchange policy</ p>
        </div>
        <div >
        <img src={assets.quality_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'> We Provide 7 days free return policy</ p>
        </div>
        <div >
        <img src={assets.support_img} alt="exchange-icon" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Best Customer Support </p>
        <p className='text-gray-400'> we provide 24/7 customer support</ p>
        </div>
        
    </div>
    </>
  )
}

export default OurPolicy