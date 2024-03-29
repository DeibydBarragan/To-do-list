import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../../animations/modalAnim'
import { createPortal } from 'react-dom'

const Modal = ({ setShow, show, children, reset }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  /**
   * This function closes the modal when the user clicks outside the modal
   * @param {InstanceType} e the event that triggers the function
   */
  const handleCloseModal = (e) => {
    if (e.target.id === 'container') {
      setShow(false)
      reset && reset()
    }
  }
  /**
   * This function closes the modal when the user clicks the close button
   */
  const handleClickClose = () => {
    setShow(false)
    reset && reset()
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
        className='fixed inset-0 overflow-y-auto backdrop-blur-sm bg-black bg-opacity-30 z-30'
      >
        <div className='flex items-center justify-center min-h-screen'
          onMouseDown={(e) => handleCloseModal(e)}
          id='container'
        >
          <motion.div
            key='children'
            id='childrenContainer'
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='relative my-10 h-auto w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 p-5 rounded-xl shadow-2xl bg-white text-slate-900 dark:text-white dark:bg-slate-900'>
            <i className='bi bi-x text-4xl text-indigo-900 dark:text-gray-500 hover:opacity-80 absolute top-3 right-3 cursor-pointer' onClick={handleClickClose}/>
            {children}
          </motion.div>
        </div>
      </motion.div>}
    </AnimatePresence>, document.body)
}

Modal.propTypes = {
  children: PropTypes.any,
  setShow: PropTypes.func.isRequired,
  show: PropTypes.any,
  reset: PropTypes.func
}

export default Modal
