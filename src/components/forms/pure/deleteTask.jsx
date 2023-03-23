import React, { useContext } from 'react'
import { TYPES } from '../../../models/taskActions'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'

const DeleteTask = ({ taskId }) => {
  const { dispatchTask, showTask, setShowTask } = useContext(TasksContext)

  const handleOnCLick = () => {
    showTask && setShowTask(false)
    dispatchTask({
      type: TYPES.delete,
      payload: taskId
    })
  }
  return (
    <button onClick={handleOnCLick} className='col-start-12'>
      <i className="bi bi-trash-fill text-3xl"/>
    </button>
  )
}

/**
 * Task must be an instance of task
 */
DeleteTask.propTypes = {
  taskId: PropTypes.number
}

export default DeleteTask
