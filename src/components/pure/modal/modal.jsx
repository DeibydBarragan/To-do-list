import React, { useContext } from 'react'
import { TasksContext } from '../../context/tasksContext'
import PropTypes from 'prop-types'

const Modal = ({ children }) => {
  const { setShowNewTask } = useContext(TasksContext)
  /**
   * When the user touches a different element of the modal container, it closes
   * @param {instanceType} e
   */
  const handleCloseModal = (e) => {
    if (e.target.id === 'container') {
      setShowNewTask(false)
    }
  }

  return (
    <div id='container'
      onClick={(e) => handleCloseModal(e)}
      className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-30'
    >
      <div className='h-4/6 w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 p-7 grid rounded-lg shadow-2xl bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any
}

export default Modal
