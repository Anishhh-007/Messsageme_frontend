import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Layout from './root/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Search from './pages/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/slices/userSlice'
import { useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/profile`, { withCredentials: true })

      dispatch(setUserData({
        id: res.data._id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        gender: res.data.gender,
        image: res.data.image,
      }))  
    } catch (error) {
      console.log('Profile fetch error: ' + error.message);

    }
  }
  useEffect(() => {
    fetchData() 
    }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />

        </Route>

      </Routes>
    </>
  )
}

export default App
