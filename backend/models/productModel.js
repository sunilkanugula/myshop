import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:string},
    date :{type:String,required:true},
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)
export default productModel