import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl } from '../../../frontend/src/App'
import axios from "axios"
import {toast} from 'react-toastify'
import { currency } from '../App.jsx'
import { assets } from '../assets/admin_assets/assets.js'
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      console.log(response, "admin")
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

 const statusHandler = async(event,orderId) => {
  try {
    const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
     if(response.data.success){
      await fetchAllOrders()
     }
     else{
      toast.error(response.data.message)
     }
  } catch (error) {
    toast.error(error.message)
   
  }
 }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>{
        orders.map((order, index) => {
         return  <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <img className='w-12' src={assets.parcel_icon} alt="" />
            <div>
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return <p className='py-0.5' key={index}> {item.name}</p>
                }
                else {
                   return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size} </span>,</p>
                }
              })}
            </div>
            <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + "," + order.address.state +" , "+ order.address.country + " , " + order.address.zip}</p>
            </div>
            <p>Phone: {order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px] mb-3'>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toDateString()}</p>
            </div>
            <div>
            <p className='text-sm sm:text-[15px] mb-3'>{currency} {order.amount}</p>
            <select onChange={()=> statusHandler(event,order._id)} value={order.status} className='font-semibold p-2'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          </div>
        })}</div>
       
    </div>
  )
}

export default Orders