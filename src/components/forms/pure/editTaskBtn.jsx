import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'

/**
 * This component returns a button that edits the task
 * @param {task} param0 task is the task to edit
 * @returns returns a button that edits the task
 */
const EditTaskBtn = ({ task }) => {
  const { setShowEditTask } = useContext(TasksContext)
  /**
   * On click, set the task to edit
   */
  const handleOnClick = () => {
    setShowEditTask(task)
  }
  return (
    <button onClick={handleOnClick} className='col-start-11 btn-icon' aria-label='edit task'>
      <i className='bi bi-pencil-fill text-3xl' alt=''/>
    </button>
  )
}

EditTaskBtn.propTypes = {
  task: PropTypes.any
}
export default EditTaskBtn
