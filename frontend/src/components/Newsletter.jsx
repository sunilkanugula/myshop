import React from 'react'

const Newsletter = () => {
    const onSubmitHandler =(e) => {
        e.PreventDefault()
    }
  return (
    <div className='text-center mt-16'>
        <p className='text-2xl font-medium text-gray-800 '>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ipsam sit architecto blanditiis nostrum nulla exercitationem id maiores sunt recusandae explicabo nesciunt, aut sed unde cum alias quis ratione labore.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required/>
            <button type="submit" className='bg-black text-white text-xs  px-10 py-4'>SUBSCRIBE</button>

        </form>
    </div> 
  )
}

export default Newsletter