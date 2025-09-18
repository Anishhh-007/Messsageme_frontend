import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Leftlogin = () => {
    const API_URI = import.meta.env.VITE_SERVER_URL
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const navigate = useNavigate()
    const handelOnSubmit =async (e) =>{
        e.preventDefault();
        try {
           
            const res = await axios.post(`${API_URI}/user/login`,
                 {
            email , 
            password
        }, {
            withCredentials : true
        })
      
        if(res.data.message === "User Logged In Successfully") return navigate("/")

          navigate("/login")
        
        
        } catch (error) {
            console.log("Login error : " +error.message);
            
        }
    }




  return (
     <div className='w-[50%] h-full '>
            <p className='text-[#0866ff] text-7xl py-15 font-bold'>
                Beyond words, true connections
            </p>
            <p className='text-[18px] text-zinc-700 pt'>Let’s pick up where the conversation left off.</p>

            <form onSubmit={handelOnSubmit} className="flex flex-col gap-4 w-full max-w-sm">
             

                <input
                    onChange={(e => setEmail(e.target.value))}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              

                <input
                    onChange={(e => setPassword(e.target.value))}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />

              


                <div className='mt-4  flex justify-between items-center w-full'>          
                          <button type='submit' className='py-2 px-6 w-fit rounded-full bg-blue-700 text-white font-bold hover:cursor-pointer hover:bg-blue-600'>LOGIN</button>
                    <a href="/signup" className='hover:cursor-pointer underline text-[12px] text-zinc-700'>New Here?</a>
                </div>
            </form>




        </div>
 
  )
}

export default Leftlogin
