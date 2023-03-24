import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'

const EditTaskBtn = ({ taskId }) => {
  const { setShowedTask, setShowEditTask } = useContext(TasksContext)
  const handleOnClick = () => {
    setShowedTask(taskId)
    setShowEditTask(true)
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
