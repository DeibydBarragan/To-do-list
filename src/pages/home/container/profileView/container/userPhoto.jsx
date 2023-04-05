import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { AuthContext } from '../../../../../components/context/authContext'
import { modalVariants } from '../../../../../components/animations/modalAnim'

/**
 * This component returns the user photo in a modal
 * @param {function} setShowPhoto function to set the show photo state
 */
const UserPhoto = ({ setShowPhoto }) => {
  const { user } = useContext(AuthContext)
  /**
   * This function closes the modal when the user clicks outside the image
   * @param {Object} e event
   */
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
        src={ user.photoURL }
        className='rounded-2xl w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 aspect-square object-cover'
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
