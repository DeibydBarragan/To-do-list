import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'
import { TYPES } from '../../../models/taskActions'

const CompleteTask = ({ taskId }) => {
  const { tasks, dispatchTask } = useContext(TasksContext)

  const findTask = (task) => task.id === parseFloat(taskId)

  const handleOnClick = () => {
    dispatchTask({
      type: TYPES.complete,
      payload: parseFloat(taskId)
    })
  }
  return (
    <button onClick={handleOnClick} className='btn-icon w-min'>
        <i className={tasks[tasks.findIndex(findTask)].isCompleted === false ? 'bi bi-check-circle-fill text-3xl' : 'bi bi-x-circle-fill text-3xl'}/>
    </button>
  )
}

/**
 * Task must be an instance of task
 */
CompleteTask.propTypes = {
  taskId: PropTypes.number
}

export default CompleteTask
