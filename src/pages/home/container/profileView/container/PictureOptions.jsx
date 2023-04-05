import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import UserPhoto from './userPhoto'
import { AnimatePresence } from 'framer-motion'
import ChangePicture from '../forms/changePicture'
import DeletePicture from '../forms/deletePicture'

/**
 * This component returns the picture options to show, change or delete the user picture
 * @returns returns the picture options
 */
const PictureOptions = () => {
  const { user } = useContext(AuthContext)
  /**
   * Show photo state
   */
  const [showPhoto, setShowPhoto] = useState(false)
  return (
    <div className='flex gap-6 items-center pb-6'>
      {user.photoURL === null
        ? <i className='text-7xl sm:text-8xl bi bi-person-circle text-indigo-800 dark:text-white'/>
        : <img
          className='w-20 sm:w-28 aspect-square object-cover rounded-3xl cursor-pointer'
          alt='user photo'
          src={user.photoURL}
          referrerPolicy='no-referrer'
          onClick={() => setShowPhoto(true)}
        />
      }
      <div className='flex flex-col gap-2'>
        <p>JPG, PNG or GIF, max weight of 1Mb</p>
        <div className='flex gap-4 w-full'>
          <ChangePicture/>
          {user.photoURL && <DeletePicture/>}
        </div>
      </div>
      <AnimatePresence>
        {showPhoto && <UserPhoto setShowPhoto={setShowPhoto}/> }
      </AnimatePresence>
    </div>
  )
}

export default PictureOptions
