import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../../animations/modalAnim'
import { createPortal } from 'react-dom'

const Modal = ({ setShow, show, children }) => {
  /**
   * When the user touches a different element of the modal container, it closes
   * @param {instanceType} e
   */
  const handleCloseModal = (e) => {
    if (e.target.id === 'container') {
      setShow(false)
      console.log('close')
    }
  }

  return createPortal(
    <AnimatePresence>
      {show &&
      <motion.div
        key='box'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        id='container'
        onMouseDown={(e) => handleCloseModal(e)}
        className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-30'
      >
        <motion.div
          key='children'
          id='childrenContainer'
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='relative h-auto w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 p-5 rounded-xl shadow-2xl bg-white text-slate-900 dark:text-white dark:bg-slate-900'>
          <i className='bi bi-x text-4xl text-indigo-900 dark:text-gray-500 hover:opacity-80 absolute top-3 right-3 cursor-pointer' onClick={() => setShow(false)}/>
          {children}
        </motion.div>
      </motion.div>}
    </AnimatePresence>, document.body)
}

Modal.propTypes = {
  children: PropTypes.any,
  setShow: PropTypes.func,
  show: PropTypes.any
}

export default Modal
