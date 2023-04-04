import { React, useContext } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'

const ChangePicture = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='w-full'>
      <input type='file' className='hidden' id='uploadPhoto'/>
      <label htmlFor='uploadPhoto' className='btn-settings cursor-pointer'>
        { user.photoURL
          ? 'Change picture'
          : 'Add picture'
        }
        <i className='bi bi-images text-2xl'/>
      </label>
    </div>
  )
}

export default ChangePicture
