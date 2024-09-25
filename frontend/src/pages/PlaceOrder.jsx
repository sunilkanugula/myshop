import Tittle from "../components/Tittle"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/frontend_assets/assets"
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
const PlaceOrder = () => {
  const [paymentMethod,setPaymentMethod] = useState("cod")
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} =useContext(ShopContext) 
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    street:"",
    state:"",
    city:"",
    zip:"",
    country:""
  })

  const onChangeHandler = (event) =>{ 
     const name = event.target.name;
     const value = event.target.value
     setFormData(data => ({...data,[name]:value}))
  } 

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for(const items in  cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size  = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData = {
        address:formData,
        items:orderItems,
        amount:  getCartAmount() + delivery_fee
      }
      
      switch (paymentMethod) {
        case 'cod':{
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          console.log(response.data.message)
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
        
          }
          break;
        }
        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
         <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"}/>
         </div>
         <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name="firstName" type='text' value={formData.firstName} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name="lastName" type='text' value={formData.lastName} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         </div> 
         <input required onChange={onChangeHandler} name="email" type='email' value={formData.email} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         <input required onChange={onChangeHandler} name="street" type='text' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name="city" type='text' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name="state" type='text' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          </div>
          <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name="zip" type='number' value={formData.zip} placeholder='Zip code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name="country" type='text' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          </div> 
          <input required onChange={onChangeHandler} name="phone" type='number' value={formData.phone} placeholder='Phone number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
         
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
            <button type="submit" className="bg-black text-white px-16 py-4">PLACE ORDER</button>
          </div>
        </div> 
      </div>
    </form>
  )
}

export default PlaceOrder