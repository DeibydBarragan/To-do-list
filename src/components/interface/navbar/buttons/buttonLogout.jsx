import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase/firebase'
import { AuthContext } from '../../../context/authContext'
import LoadingButton from '../../../forms/pure/loadingButton'

/**
 * This component returns a button that logs out the user
 * @returns returns a button that logs out the user
 */
const ButtonLogout = () => {
  const { setUser } = useContext(AuthContext)
  /**
   * This state is used to show a loading button
   */
  const [formLoading, setFormLoading] = useState(false)
  const navigate = useNavigate()
  /**
   * This function logs out the user and navigates to the login page
   */
  const handleLogout = async () => {
    setFormLoading(true)
    await signOut(auth)
    setUser(null)
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
