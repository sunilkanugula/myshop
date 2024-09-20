import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedPrducts';

const Product = () => {
  const location = useLocation(); // Hook to access the location object
  const { productId } = useParams(); // Get productId from URL parameters
  const { products, currency ,addToCart} = useContext(ShopContext); // Access products and currency from context
  const [productData, setProductData] = useState(null); // State to store the current product data
  const [image, setImage] = useState(""); // State to store the currently selected image
  const [size, setSize] = useState(""); // State to store the selected size

  // Function to fetch product data based on productId
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId); // Find product with matching ID
    if (product) {
      setProductData(product); // Set the fetched product data
      setImage(product.image[0]); // Set the first image as the default image
    }
  };
 
  const handleAddToCart = () => {
    addToCart(productData._id, size);
    setSize(''); // Reset the size after adding to cart
  };

  // Effect to fetch the product data whenever productId, products, or location changes
  useEffect(() => {
    if (productId) {
      fetchProductData(); // Fetch product data
      window.scrollTo(0, 0);
    }
  }, [productId, products, location.pathname]); // Depend on productId, products, and location.pathname

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt="Product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="Product" className='w-full h-auto' />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='font-medium mt-5 text-3xl'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 sm:text-xl'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${item === size ? 'border-orange-500' : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p className='font-medium text-base'>100% Original product.</p>
            <p className='font-medium text-base'>Cash on delivery is available on this product.</p>
            <p className='font-medium text-base'>Easy return and exchange policy within 7 days.</p>
          </div>
          
        </div>
      </div>
      <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm border-gray-500'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>
          </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} subcategory={productData.subcategory} id={productData._id} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
