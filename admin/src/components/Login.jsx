import axios from "axios"
import { useState } from "react"
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error response:", error.response);
            if (error.response && error.response.status === 401) {
                // Unauthorized access, show relevant message
                toast.error(error.response.data.message || "Invalid credentials. Please try again.");
            } else {
                // Handle other errors
                toast.error(error.message || "An error occurred");
            }
        }
    };
    
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3 min-w-72">
                    <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} className="rounded-md w-full px-3 py-2 border #border-gray-300 outline-none" type="email" placeholder='your@email.com' required/>
                </div>
                <div className="mb-3 min-w-72">
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} className="rounded-md w-full px-3 py-2 border #border-gray-300 outline-none" type="password" placeholder='enter your password' required/>
                </div>
                <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login