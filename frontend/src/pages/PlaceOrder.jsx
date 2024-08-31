import Tittle from "../components/Tittle"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/frontend_assets/assets"
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
const PlaceOrder = () => {
  const [paymentMethod,setPaymentMethod] = useState("cod")
  const {navigate} =useContext(ShopContext) 
  return (
    <div  className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
         <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"}/>
         </div>
         <div className='flex gap-3'>
          <input type='text' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input type='text' placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         </div> 
         <input type='email' placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         <input type='text' placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <div className='flex gap-3'>
          <input type='text' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input type='text' placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          </div>
          <div className='flex gap-3'>
          <input type='number' placeholder='Zip code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          </div> 
          <input type='number' placeholder='Phone number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         
      </div>
      {/*-------------Right Side  */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Tittle text1={"PAYMENY"} text2={"METHOD"}/>
          {/* PAYMENT METHOD SELECTION */}
          <div className="flex gap-3 flex-col lg:flex-row">
              <div  onClick={()=> setPaymentMethod("stripe")} className="flex items-center gap-3  border p-2 px-3 cursor-pointe border-gray-300">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "stripe" ? 'bg-green-600':""}`}></p>
                <img src={assets.stripe_logo} alt="stripe-img" className="h-5 mx-4"/>
              </div>
              <div onClick={()=> setPaymentMethod("razorpay")} className="flex items-center gap-3  border p-2 px-3 cursor-pointer border-gray-300">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "razorpay" ? 'bg-green-600':""}`}></p>
                <img src={assets.razorpay_logo} alt="stripe-img" className="h-5 mx-4"/>
              </div>
              <div onClick={()=> setPaymentMethod("cod")} className="flex items-center gap-3  border p-2 px-3 cursor-pointer border-gray-300">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "cod" ? 'bg-green-600':""}`}></p>
                <p  className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate("/orders")} className="bg-black text-white px-16 py-4">PLACE ORDER</button>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default PlaceOrder