import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { AuthContext } from '../../../../../components/context/authContext'
import { modalVariants } from '../../../../../components/animations/modalAnim'

const UserPhoto = ({ setShowPhoto }) => {
  const { userPhoto } = useContext(AuthContext)

  const handleClick = (e) => {
    if (e.target.id === 'container') {
      setShowPhoto(false)
    }
  }
  return createPortal(
    <motion.div
      id='container'
      className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-30 '
      onClick={(e) => handleClick(e)}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={ userPhoto }
        className='rounded-2xl w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'
        alt='user photo'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      />
    </motion.div>
    , document.body)
}

export default UserPhoto
