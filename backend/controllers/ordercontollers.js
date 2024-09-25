import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
//placing   orders using COD Method 
const placeOrder = async (req,res) => {
   
    try{
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now() 
        }
        console.log("order hii",amount)
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        console.log("success")
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
        
        
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

//placing orders  using Stripe Method
const placeOrderStripe = async (req,res) => {
    
}

//placing order using tRazorpay method 
const placeOrderRazorpay = async (req,res) => {
        
}

// All order for admin panel
const allOrders = async(req,res) => {

}

//User orders Data for frontend 
const userOrders = async(req,res) => {
    console.log("user order success")
    try {
        const {userId} = req.body;
        const orders =await orderModel.find({userId})
        res.json({success:true,orders}) 
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
    
}

//update order status Admin panel
const  updateStatus = async(req,res) => {

}

export  {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}