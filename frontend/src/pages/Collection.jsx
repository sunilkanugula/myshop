import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,showSearch,search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [subcategory,setSubCategory] = useState([]);
  const [category,setCategory] = useState([]);
  const [sortType,setSortType] = useState("relevant")
  
  const toggleCategory = (e) => {
      if(category.includes(e.target.value)){
         setCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
        setCategory(prev => [...prev,e.target.value])
      }
  }
 
 const toggleSubCategory =(e) => {
  if(subcategory.includes(e.target.value)){
    setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
   else {
    setSubCategory(prev => [...prev,e.target.value])
   }
 }

 const applyFilter = () => {
  let productsCopy = products.slice();
  if(search && showSearch) {
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if(category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category))
  }

  if(subcategory.length > 0) {
    productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
  }
  setFilterProducts(productsCopy)
 }

 const sortProduct =() => {
   let fpCopy = filterProducts.slice();
   switch(sortType){
    case "low-high" :
      setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
      break;
    case "high-low" :
      setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
      break;
    default:
      applyFilter();
      break;    
   }
 }

  useEffect(()=> {
    setFilterProducts(products)
  },[products])

 useEffect(()=> {
  applyFilter()
 },[category,subcategory,search,showSearch,products])

 useEffect(()=> {
  sortProduct()
 },[sortType])
  
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        {/* category filter */}
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        <div className={`border border-gray-300 p-2 pl-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block`} key="categories">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Men" onChange={toggleCategory}/> Men 
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Women" onChange={toggleCategory}/> Women 
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Kids" onChange={toggleCategory}/> Kids 
            </p>
          </div>
        </div>
        {/* SUB-CATEGORY */}
        <div className={`border border-gray-300 p-2 pl-5 my-5 ${showFilter ? '' : 'hidden'} sm:block`} key="subcategories">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Topwear" onChange={toggleSubCategory}/> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Bottomwear" onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Winterwear" onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
       <Tittle text1={"ALL"} text2={"COLLECTION"}/>
       {/* PRODUCT SORT */}
       <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
        <option value="relevant">Sort by : Relavent</option>
        <option value="low-high">Sort by : Low to High</option>
        <option value="high-low">Sort by : High to Low </option>
       </select>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 gap-y-6'>
        {filterProducts.map((each,index) => <ProductItem key={index} id={each._id} image={each.image} name={each.name} price={each.price}/>)}
      </div>
      </div>
    </div>
  );
};

export default Collection;