/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from "react";
import {products} from "../assets/frontend_assets/assets"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search,setSearch] = useState("");
  const [showSearch,setShowSearch] = useState(false);
  const [cartItems,setCartItems] = useState({});
  const navigate = useNavigate()
  const addToCart = async(itemId,size) => {
         if(!size){
          toast.error('Select Size');
          return
         }
       
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
          if(cartData[itemId][size]){
            cartData[itemId][size] +=1;
          }
          else{
            cartData[itemId][size] = 1;
          }
          toast.success("Added to Cart")
        }
        else{
          cartData[itemId] = {};
          cartData[itemId][size] = 1;
          toast.success("Added to Cart")
        }
        setCartItems(cartData)
  }

const updateCartCount = async(itemId,size,quantity) => {
  if(quantity === 0) {
    toast.error("Item deleted")
  }

  let cartData = structuredClone(cartItems);
  if(cartData[itemId][size] <quantity){
    toast.success("One Item added")
  }
  else if(cartData[itemId][size] > quantity && quantity !== 0){
    toast.warning("One Item decreased")
  }

  cartData[itemId][size] = quantity;
  setCartItems(cartData);
}

const getCartAmount = async() => {
  let totalCartAmount = 0;
  for (const itemId in cartItems) {
    const productInfo = products.find(item => item._id === itemId);
    for (const size in cartItems[itemId]) {
      try {
        totalCartAmount += productInfo.price * cartItems[itemId][size];
      } catch (error) {
        console.log(error);
      }
    }
  }
  return totalCartAmount;
};


  useEffect(()=> {
    console.log(cartItems)
  },[cartItems])

  const getCartCount = () => {
    let totalCount = 0;
  
    for (const items in cartItems) {
      // Loop through each item in cartItems
      for (const size in cartItems[items]) {
        // Loop through each size in the nested object
        try {
          if (cartItems[items][size] > 0) {
            // Check if the quantity is greater than 0
            totalCount += cartItems[items][size]; // Add the quantity to totalCount
          }
        } catch (error) {
          console.log(error); // Log any errors that occur
        }
      }
    }
  
    return totalCount; // Return the total count after the loops
  };
  
  const value = {
    products,
    currency,
    delivery_fee,
    search,setSearch,showSearch,setShowSearch,
    cartItems,addToCart,getCartCount,updateCartCount,getCartAmount,navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
