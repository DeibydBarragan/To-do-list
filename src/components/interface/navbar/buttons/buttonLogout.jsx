import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonLogout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }
  return (
    <button className='btn col-span-3' onClick={handleLogout}>
                Logout
      <i className="bi bi-box-arrow-right ml-2 text-xl"></i>
    </button>
  )
}

export default ButtonLogout
