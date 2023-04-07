import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'

/**
 * This component returns a div with the user photo and name
 * @returns returns a div with the user photo and name
 */
const ProfileNav = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  /**
   * This function navigates to the profile page
   */
  const handleViewProfile = () => {
    navigate('/home/profile')
  }
  return (
    <div className='flex flex-row gap-4 items-center justify-center cursor-pointer' onClick={handleViewProfile}>
      {user.photoURL === null
        ? <i className='text-5xl bi bi-person-circle'/>
        : <img className='rounded-full w-12 h-12 object-cover' alt='user photo' src={user.photoURL} referrerPolicy='no-referrer'/>
      }
      <h2 className='text-xl text-white max-w-min'>
        { user.displayName.split(' ')[0] }
      </h2>
    </div>
  )
}

export default ProfileNav
