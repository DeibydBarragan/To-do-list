import React, { useContext } from 'react'
import { TYPES } from '../../../models/taskActions'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { AuthContext } from '../../context/authContext'
import { NotificationContext } from '../../context/notificationContext'
import { NotificationClass } from '../../../models/notification.class'

/**
 * This component returns a button that deletes the task
 * @param {taskId} param0 taskId is the id of the task to delete
 * @returns returns a button that deletes the task
 */
const DeleteTask = ({ task }) => {
  const { dispatchTask, showTask, setShowTask } = useContext(TasksContext)
  const { user } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  /**
   * This function dispatches the action to the reducer
   * @param {task} task is the task to find
   * @returns
   */
  const handleOnCLick = async () => {
    /**
     * If the task is being deleted, close the form
     */
    showTask && setShowTask(false)
    /**
     * Dispatch the action to the reducer
     */
    dispatchTask({
      type: TYPES.delete,
      payload: task.id
    })
    /**
     * Delete the task in the database
     */
    try {
      /**
       * Get the document reference
       */
      const docRef = doc(db, 'tasks', user.uid, 'userTasks', task.id)
      await deleteDoc(docRef)
    } catch (error) {
      console.log(error)
      setNotification(new NotificationClass('Error', 'Error deleting the task', 'error'))
    }
  }
  return (
    <button onClick={handleOnCLick} className='col-start-12 btn-icon' aria-label='delete task'>
      <i className="bi bi-trash-fill text-3xl" alt=''/>
    </button>
  )
}

DeleteTask.propTypes = {
  task: PropTypes.any
}

export default DeleteTask
