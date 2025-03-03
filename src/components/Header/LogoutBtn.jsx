import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <>
      <button
        className='text-[#C5001A] p-2 w-full transition-transform  transform hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-start'
        onClick={logoutHandler}
      >Logout</button>
    </>
  )
}

export default LogoutBtn

