import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import ChangeUsername from '../forms/changeUsername'
import UserPhoto from './userPhoto'
import { AnimatePresence } from 'framer-motion'

const UserInfo = () => {
  const { userPhoto } = useContext(AuthContext)
  const [showPhoto, setShowPhoto] = useState(false)
  return (
    <div className='flex sm:flex-col gap-3'>
      <img src={userPhoto}
        alt='user photo'
        className='w-20 sm:w-40 md:w-52 rounded-3xl cursor-pointer'
        onClick={() => setShowPhoto(true)}
      />
      <AnimatePresence>
        {showPhoto && <UserPhoto setShowPhoto={setShowPhoto}/> }
      </AnimatePresence>
      <div className='flex flex-col'>
        <ChangeUsername/>
        <h4>
          Logged with <i className="text-xl bi bi-google"/>
        </h4>
      </div>
    </div>
  )
}

export default UserInfo
