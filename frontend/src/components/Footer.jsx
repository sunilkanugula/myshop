import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (<div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div >
            <h1  className='mb-5 w-32 text-3xl'>WOLFY</h1>
            <p className='w-full '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, doloribus id non temporibus iure magnam architecto error iste eligendi veniam fuga exercitationem officiis tempore amet placeat eveniet illo cupiditate ut!</p>
        </div>

        <div>
           <p className='text-xl font-medium mb-5'>COMPANY</p>
           <ul className='flex flex-col gap-1 text-gray-600'>
           <li>Home</li>
           <li>About us</li>
           <li>Delivery</li>
           <li>Privacy Policy</li>
           </ul>
        </div>

        <div>
         <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
         <ul  className='flex flex-col gap-1 text-gray-600'>
            <li>7093770108</li>
            <li>kanugulasunilkumar@gmail.com</li>
         </ul>
        </div>
    </div>
    <div>
      <hr/>
      <p className='py-5 text-sm text-center'>Copyright 2024@ wolfy.in - All Rights Reserved</p>
    </div>
    </div>
  )
}

export default Footer