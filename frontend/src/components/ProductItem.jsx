import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
const ProductItem = (props) => {
    const {id,image,name,price} = props
    const {currency} = useContext(ShopContext)
  return (
    <Link to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img src={image[0]} className='hover:scale-110 transition ease-in-out'/>
           </div>
          <p className='pt-3 pb-1 test-sm text-gray-500'>{name}</p>
          <p className='text-base font-medium text-gray-700'>{currency} {price}</p>
    </Link>
  )
 
}

export default ProductItem
