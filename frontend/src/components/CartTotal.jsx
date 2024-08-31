import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Tittle';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0); // State to hold the cart total

  useEffect(() => {
    const fetchCartAmount = async () => {
      try {
        const amount = await getCartAmount(); // Await the async function
        setCartAmount(amount); // Set the fetched amount in state
      } catch (error) {
        console.error("Failed to fetch cart amount:", error);
      }
    };

    fetchCartAmount(); // Call the async function
  }, [getCartAmount]); // Runs when `getCartAmount` changes

  return (
    <div className='w-full'>
      <div className='text-2xl '>
        <Tittle text_1={"CART"} text_2={"TOTALS"} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal:</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <hr className='w-full'/>
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr className='w-full'/>
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
