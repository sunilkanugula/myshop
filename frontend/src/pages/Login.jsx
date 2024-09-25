import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {
  
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)
  
  useEffect(()=>{
    console.log(token,"login")
    if(token) {
      navigate("/")
    }
  },[token])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      
      if (currentState === 'Login') {
           const response = await axios.post(backendUrl+'/api/user/login',{email,password});
           console.log(response.data.success,"login")
           if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            toast.success("Login Successfully")
            console.log("login success")
           }
           else{
               toast.error(response.data.message)
           }
      } else {
        const response =  await axios.post(backendUrl+'/api/user/register',{name,email,password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
          toast.success("Register Successfully")
          setCurrentState("Login")
          setName("");
          setPassword("");
          setEmail("");
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  };

 
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-400">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
      
    </form>
  );
};

export default Login;
