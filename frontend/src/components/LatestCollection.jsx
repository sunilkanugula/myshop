import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [LatestProducts,selectLatestProducts] = useState([]);
    useEffect(()=> {selectLatestProducts(products.slice(0,10))},[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
     <Tittle text1={"LATEST"} text2={"COLLECTION"}/>
     <p className='w-3/4 m-auto text-xs md:text-base text-gray-600'>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque corrupti et delectus non numquam, ex provident unde, exercitationem nobis aspernatur amet, odio ab ut at pariatur quo in nemo.
     </p>
    </div>
    {/* Rendering products  */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {LatestProducts.map((each,index) => <ProductItem key={index} id={each._id} image={each.image} name={each.name} price={each.price}/>)}
    </div>
    </div>
  )
}

export default LatestCollection