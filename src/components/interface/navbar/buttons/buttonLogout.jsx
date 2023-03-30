import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase/firebase'
import { AuthContext } from '../../../context/authContext'

const ButtonLogout = () => {
  const { setUser, setLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)
    setUser(null)
    await signOut(auth)
    navigate('/login')
    setLoading(false)
  }
  return (
    <button className='btn col-span-3' onClick={handleLogout}>
      Logout
      <i className="bi bi-box-arrow-right ml-2 text-xl"></i>
    </button>
  )
}

export default ButtonLogout
