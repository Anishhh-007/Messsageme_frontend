import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const hidePaths = ['/login', '/signup']
  const hideNavbar = hidePaths.includes(location.pathname)

  useEffect(() => {

    if (user.id) return navigate("/")
    else {
      navigate("/login")
    }


    if (location.pathname === '/login') {
      navigate('/login')
    } else if (location.pathname === '/signup') {
      navigate('/signup')
    }

  }, [user.id])
  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Outlet />

    </div>
  )
}

export default Layout
