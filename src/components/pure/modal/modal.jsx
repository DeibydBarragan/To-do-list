import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { modalVariants } from '../../animations/modalAnim'
import { createPortal } from 'react-dom'

const Modal = ({ setShow, children }) => {
  /**
   * When the user touches a different element of the modal container, it closes
   * @param {instanceType} e
   */
  const handleCloseModal = (e) => {
    if (e.target.id === 'container') {
      setShow(false)
    }
  }

  return createPortal(
    <motion.div
      key='box'
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id='container'
      onClick={(e) => handleCloseModal(e)}
      className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-30 '
    >
      <motion.div
        key='children'
        id='childrenContainer'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='h-auto w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 p-5 rounded-lg shadow-2xl bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700'>
        {children}
      </motion.div>
    </motion.div>
    , document.body)
}

Modal.propTypes = {
  children: PropTypes.any,
  setShow: PropTypes.func
}

export default Modal
