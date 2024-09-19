import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
  console.log(req.body.subcategory,"hii")
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;
   
    // Make sure req.files and individual images exist before accessing them
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // Filter out any undefined images
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload images to Cloudinary
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url; // Use secure_url to get the uploaded image URL
      })
    );

    const productData = {
      name,
      description,
      category,
      price:Number(price),
      subcategory,
      bestseller:bestseller === "true" ? true : false,
      sizes:JSON.parse(sizes),
      date:Date.now(),

    }
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({success:true,message:"Product added"}); 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  // Logic for removing product
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"product deleted"});

  } catch (error) {
     res.json({success:false,message:error});
  }
};

const listProducts = async (req, res) => {
  // Logic for listing products
  try {
    const products  = await productModel.find({});
    res.json({success:true,products})
   } catch (error) {
     console.log(error);
  }
};

const singleProduct = async (req, res) => {
  // Logic for getting a single product
  try {
    const {productId} =  req.body; 
    const product = await productModel.findById(productId);
    res.json({success:true,product})
  } catch (error) {  
     res.json({success:false,message:error})
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
