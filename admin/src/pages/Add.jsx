import React, { useState } from 'react'
import { assets } from "../assets/admin_assets/assets"
import axios from "axios";
import { backendUrl } from '../App';
import {toast} from "react-toastify"
const Add = ({token}) => {
  console.log(token,"add.jsx")
  const[image1,setImage1] = useState(false);
  const[image2,setImage2] = useState(false);
  const[image3,setImage3] = useState(false);
  const[image4,setImage4] = useState(false);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("Men");
  const [subcategory,setSubcategory] = useState("Topwear");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([])
  
  const onSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(category,subcategory)
      try {
        const formData = new FormData()
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subcategory",subcategory);
      formData.append("sizes",JSON.stringify(sizes));
      formData.append("bestseller",bestseller);
     image1 && formData.append("image1",image1);
     image2 && formData.append("image2",image2);
     image3 && formData.append("image3",image3);
     image4 && formData.append("image4",image4);
     
     const response = await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}});
     if(response.data.success){
      toast.success(response.data.message);
      setName("");
      setDescription("");
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");
      setSizes([]);
      setBestseller(false);
      setPrice("")
     }
      } catch (error) {
        console.log(error)
        toast.error(response.data.message)
      }
      
  }
  
  return (
    <form className='flex flex-col gap-3 items-start w-full' onSubmit={onSubmitHandler}>
      <div>
        <p>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ?assets.upload_area :URL.createObjectURL(image1)} alt="upload image" />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden />
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ?assets.upload_area :URL.createObjectURL(image2)} alt="upload image" />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden />
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ?assets.upload_area :URL.createObjectURL(image3)} alt="upload image" />
            <input  onChange={(e) => setImage3(e.target.files[0])} type='file' id="image3" hidden />
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ?assets.upload_area :URL.createObjectURL(image4)} alt="upload image" />
            <input onChange={(e) => setImage4(e.target.files[0])} type='file' id="image4" hidden />
          </label>
        </div>

      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=> setName(e.target.value)} type='text' value={name} className='w-full max-w-[500px] px-3 py-2' placeholder='Type here' required
        />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} type='text' className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>
        <div>
        <p className='mb-2'>Product category</p>
        <select className='w-full px-3 py-2' onChange={(e)=> setCategory(e.target.value)} value={category}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub category</p>
        <select className='w-full px-3 py-2' onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">WinterWear</option>
        </select>
      </div>
    
      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e)=> setPrice(e.target.value)}  value={price} className='px-3 py-2 w-full sm:w-[120px]' type='Number'placeholder='25' required/>
      </div>
      </div>
      <div >
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div className={`${sizes.includes("S") ? "bg-pink-200":"bg-slate-200"} px-3 py-2 cursor-pointer`} onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item => item !== "S") :[...prev,"S"])}>
            <p>S</p>
          </div>
          <div  className={`${sizes.includes("M") ? "bg-pink-200":"bg-slate-200"} px-3 py-2 cursor-pointer`} onClick={()=>setSizes(prev =>prev.includes("M") ? prev.filter(item => item !== "M") :[...prev,"M"])}>
            <p>M</p>
          </div>
          <div  className={`${sizes.includes("L") ? "bg-pink-200":"bg-slate-200"} px-3 py-2 cursor-pointer`} onClick={()=>setSizes(prev =>prev.includes("L") ? prev.filter(item => item !== "L") :[...prev,"L"])}>
            <p>L</p>
          </div>
          <div  className={`${sizes.includes("XL") ? "bg-pink-200":"bg-slate-200"} px-3 py-2 cursor-pointer`} onClick={()=>setSizes(prev =>prev.includes("XL") ? prev.filter(item => item !== "XL") :[...prev,"XL"])}>
            <p>XL</p>
          </div>
          <div  className={`${sizes.includes("XXL") ? "bg-pink-200":"bg-slate-200"} px-3 py-2 cursor-pointer`} onClick={()=>setSizes(prev =>prev.includes("XXL") ? prev.filter(item => item !== "XXL") :[...prev,"XXL"])}>
            <p>XXL</p>
          </div>
        </div>
      </div>
      <div className='mt-3 flex gap-2'>
        <input onClick={()=>setBestseller(prev => !prev)}  checked={bestseller} className='cursor-pointer' type="checkbox" id="bestseller"/>
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add