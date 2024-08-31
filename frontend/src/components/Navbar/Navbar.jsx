import  { useContext, useState } from 'react'
import {assets} from "../../assets/frontend_assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
    const [isVisible,onSetVisible] = useState(false);
    const {setShowSearch,showSearch,getCartCount} = useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium '>
      <Link to="/"> <h1  className='w-36'>WOLFY</h1></Link>
        <ul className='hidden sm:flex   gap-7  text-gray-700 '>
           <NavLink to="/" className="flex flex-col items-center gap-1 ">
              <p>HOME</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink> 
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
              <p>COLLECTION</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink> 
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>ABOUT</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink> 
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>CONTACT</p>
              <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink> 

        </ul>
        <div className='flex items-center gap-6'>
            <img onClick={()=> setShowSearch(!showSearch)} src={assets.search_icon} alt='search-icon' className='w-5'/>
            <div className='group relative'>
              <img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer'/>
               <div className='group-hover:block hidden absolute drop-down-menu right-0 pt-4'>
                  <div className='flex flex-col  pl-3 gap-2 w-36 py-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
        v    </div>
           </div>
           <NavLink to="/cart" className="relative">
              <img src={assets.cart_icon} className='w-5 min-w-5 bg-white' alt="cart-icon"/>
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount() || 0}</p>
           </NavLink>
           <img src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer sm:hidden' onClick={()=> onSetVisible(true)}/>
        </div>
        {/* side menu for  all small cases  */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${isVisible ? "w-full" :"w-0"}`}>

            <div className='flex flex-col text-gray-600 '>
                <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={()=> onSetVisible(false)}>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180'/>
                    <p>Back</p> 
                </div>
                <NavLink to="/" className="py-5 pl-6 border" onClick={()=> onSetVisible(false)}>HOME</NavLink>
                <NavLink to="/collection" className="py-5 pl-6 border" onClick={()=> onSetVisible(false)}>COLLECTION</NavLink>
                <NavLink to="/about" className="pt-5 pb-5 pl-6 border" onClick={()=> onSetVisible(false)}>ABOUT</NavLink>
                <NavLink to="/contact" className="py-5 pl-6 border" onClick={()=> onSetVisible(false)}>CONTACT</NavLink>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar