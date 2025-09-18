import React from 'react'
import Leftlogin from '../components/Leftlogin'
import Rightlogin from '../components/Rightlogin'

const Login = () => {
  return (
   <div className='max-h-full max-w-full '>
     <div className='w-[70%]  flex items-center justify-center'>
      <Leftlogin />
      <Rightlogin />
    </div>
   </div>
  )
}

export default Login
