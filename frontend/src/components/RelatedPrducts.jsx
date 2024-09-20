import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Tittle from './Tittle';

const RelatedProducts = ({ category, subcategory, id }) => {
  const { products } = useContext(ShopContext);
  const [relevant, setRelated] = useState([]);
  console.log(subcategory)
  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) =>
          item.category === category &&
          item.subcategory === subcategory &&
          item._id !== id
      );
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [products, category, subcategory, id]); // Include category, subCategory, and id in the dependency array

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Tittle text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {relevant.map((each) => (
          <ProductItem
            key={each._id}
            id={each._id}
            image={each.image}
            name={each.name}
            price={each.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
