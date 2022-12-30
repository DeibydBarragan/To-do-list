import React, { useContext } from 'react'
import { TasksContext } from '../context/tasksContext'
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
      {children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any
}

export default Modal
