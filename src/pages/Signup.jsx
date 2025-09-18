import React from 'react'
import Leftsignup from '../components/Leftsignup'
import Rightsignup from '../components/Rightsignup'

const Signup = () => {
  return (
    <div className='bg-white max-h-full max-w-full'>
      <div className='w-[70%] h-[100%] flex justify-center items-center'>
        <Leftsignup />
      <Rightsignup />
      </div>
    </div>
  )
}

export default Signup
