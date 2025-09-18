import React, { useEffect } from 'react'
import Firsthome from '../components/Firsthome'
import Middlehome from '../components/Middlehome'
import Righthome from '../components/Righthome'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {addFriends} from '../redux/slices/friendsSlice'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${API_URL}/connection/friends` , {withCredentials : true})
     if (res.status === 200) {
    dispatch(addFriends(res.data))
  
  }   
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() =>{
    if(location.pathname === '/') fetchFriends()
  } , [location.pathname])

  return (
    <div className='h-[80vh] max-w-full mt-4 flex justify-center'>
      <div className='w-[90%] h-full flex justify-between'>
        <Firsthome />
        <Middlehome />
        <Righthome />
      </div>
    </div>
  )
}

export default Home
