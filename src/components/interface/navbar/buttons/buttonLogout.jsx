import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase/firebase'
import { AuthContext } from '../../../context/authContext'
import LoadingButton from '../../../forms/pure/loadingButton'

const ButtonLogout = () => {
  const { setUser } = useContext(AuthContext)
  const [formLoading, setFormLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setFormLoading(true)
    setUser(null)
    await signOut(auth)
    navigate('/login')
    setFormLoading(false)
  }
  return (
    <button className='btn col-span-3' onClick={handleLogout}>
      Logout
      {formLoading
        ? <LoadingButton/>
        : <i className="bi bi-box-arrow-right text-xl"/>
      }
    </button>
  )
}

export default ButtonLogout
