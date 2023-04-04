import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'

const ProfileNav = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const handleViewProfile = () => {
    navigate('/home/profile')
  }
  return (
    <div className='flex flex-row gap-4 items-center justify-center cursor-pointer' onClick={handleViewProfile}>
      {user.photoURL === null
        ? <i className='text-4xl bi bi-person-circle'/>
        : <img className='rounded-full w-12' alt='user photo' src={user.photoURL} referrerPolicy='no-referrer'></img>
      }
      <h2 className='text-xl text-white max-w-min'>
        { user.displayName.split(' ')[0] }
      </h2>
    </div>
  )
}

export default ProfileNav
