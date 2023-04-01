import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import UserPhoto from './userPhoto'
import { AnimatePresence } from 'framer-motion'
import ChangePicture from '../forms/changePicture'
import DeletePicture from '../forms/deletePicture'

const PictureOptions = () => {
  const { userPhoto } = useContext(AuthContext)
  const [showPhoto, setShowPhoto] = useState(false)
  return (
    <div className='flex gap-6 items-center pb-6'>
      {userPhoto === null
        ? <i className='text-7xl bi bi-person-circle'/>
        : <img
          className='w-20 sm:w-24 md:w-28 rounded-3xl cursor-pointer'
          alt='user photo'
          src={userPhoto}
          referrerPolicy='no-referrer'
          onClick={() => setShowPhoto(true)}
        />
      }
      <div className='flex flex-col gap-2'>
        <p className='text-gray-900 dark:text-white text-sm'>JPG, PNG or GIF, max weight of 1Mb</p>
        <div className='flex gap-4 w-full'>
          <ChangePicture/>
          <DeletePicture/>
        </div>
      </div>
      <AnimatePresence>
        {showPhoto && <UserPhoto setShowPhoto={setShowPhoto}/> }
      </AnimatePresence>
    </div>
  )
}

export default PictureOptions
