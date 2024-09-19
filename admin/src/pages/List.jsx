import React, { useEffect, useState } from "react";
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({token}) => {
  const [list,setList] = useState([])
  
  const fethcList = async() => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list');
      console.log(response)
      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

 const onClickRemoveProduct = async(id) => {
     try {
      const response = await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fethcList();
      }
      else{
        toast.error(response.data.message)
      }
     } catch (error) {
      toast.error(error.message)
     } 
  }

  useEffect(() => {
     fethcList()
  }, [])
  
 
  return (
    <div>
      <p className="mb-2">All the products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-1 px-2 border bg-gray-100 text-sm"> 
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
        </div>
        {/* product list  */}
        {list.map((item,index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
               <img className="w-12" src={item.image[0]}/>
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{currency} {item.price}</p>
               <p onClick={()=>onClickRemoveProduct(item._id)} className="text-right md:text-left cursor-pointer text-lg">X</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default List