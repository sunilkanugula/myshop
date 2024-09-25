import express from 'express'
import { placeOrder,userOrders,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus} from '../controllers/ordercontollers.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus); //admin can only update the status

//Payment Features 
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/rezorpay',authUser,placeOrderRazorpay)

//User Features
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
