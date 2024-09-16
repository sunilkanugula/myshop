import { useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Name state for Sign Up

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual sign-up/login API request handling
      if (currentState === 'Login') {
        // Perform login logic here
        toast.success('Login Successful');
        navigate('/'); // Navigate after successful login
      } else {
        // Perform sign-up logic here
        toast.success('Sign Up Successful');
        navigate('/'); // Navigate after successful sign-up
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google`; // Redirects to Google OAuth
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Failed to authenticate with Google');
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
      <button type="button" onClick={handleGoogleAuth} className="bg-black text-white font-light px-8 py-2 mt-4">
        Sign in with Google
      </button>
    </form>
  );
};

export default Login;
