import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'
import { TYPES } from '../../../models/taskActions'

/**
 * This component returns a button that completes the task
 * @param {string} param0 taskId is the id of the task to complete
 * @returns returns a button that completes the task
 */
const CompleteTask = ({ taskId }) => {
  const { tasks, dispatchTask } = useContext(TasksContext)
  /**
   * This function finds the task in the array of tasks
   * @param {task} task is the task to find
   * @returns
   */
  const findTask = (task) => task.id === parseFloat(taskId)
  /**
   * This function dispatches the action to the reducer
   */
  const handleOnClick = () => {
    dispatchTask({
      type: TYPES.complete,
      payload: parseFloat(taskId)
    })
  }
  return (
    <button onClick={handleOnClick} className='w-min btn-icon'>
      <i className={tasks[tasks.findIndex(findTask)].isCompleted === false ? 'bi bi-check-circle-fill text-3xl' : 'bi bi-x-circle-fill text-3xl'}/>
    </button>
  )
}

CompleteTask.propTypes = {
  taskId: PropTypes.number
}

export default CompleteTask
