import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type:Object, required: true }, // Changed to String type, modify as per your need
  status: { type: String, required: true, default: 'Order Placed' },
  paymentMethod: { type: String, required: true }, // Changed to lowercase naming convention
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true, default: Date.now }, // Changed to Date type
});

// Create or reuse the model
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
