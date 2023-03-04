import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'
import { ModalContext } from '../../context/ModalContext'

const EditTaskBtn = ({ taskId }) => {
  const { setShowedTask, setShowEditTask } = useContext(TasksContext)
  const { setModalOpen } = useContext(ModalContext)
  const handleOnClick = () => {
    setShowedTask(taskId)
    setShowEditTask(true)
    setModalOpen(true)
  }
  return (
    <button onClick={handleOnClick} className='col-start-11 btn-icon'>
      <i className='bi bi-pencil-fill text-3xl'/>
    </button>
  )
}

/**
 * Task must be an instance of task
 */
EditTaskBtn.propTypes = {
  taskId: PropTypes.number
}

export default EditTaskBtn
