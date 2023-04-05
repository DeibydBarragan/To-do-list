import React, { useContext } from 'react'
import { TYPES } from '../../../models/taskActions'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'

/**
 * This component returns a button that deletes the task
 * @param {taskId} param0 taskId is the id of the task to delete
 * @returns returns a button that deletes the task
 */
const DeleteTask = ({ taskId }) => {
  const { dispatchTask, showTask, setShowTask } = useContext(TasksContext)
  /**
   * This function dispatches the action to the reducer
   * @param {task} task is the task to find
   * @returns
   */
  const handleOnCLick = () => {
    /**
     * If the task is being deleted, close the for
     */
    showTask && setShowTask(false)
    dispatchTask({
      type: TYPES.delete,
      payload: taskId
    })
  }
  return (
    <button onClick={handleOnCLick} className='col-start-12 btn-icon'>
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
