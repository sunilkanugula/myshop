import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    console.log("hii", products)
    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestseller);
        setBestSeller(bestProducts.slice(0, 5)) // corrected slice syntax
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Tittle text1={"BEST"} text2={"SELLERS"}/> {/* corrected typo */}
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi iusto neque architecto sequi vero! Minus mollitia voluptatem impedit vel? Beatae pariatur quis culpa totam ratione neque blanditiis enim tempora fuga!</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {bestSeller.map((each, index) => <ProductItem key={index} id={each._id} image={each.image} name={each.name} price={each.price}/>)}
        </div>
    </div>
  )
}

export default BestSeller