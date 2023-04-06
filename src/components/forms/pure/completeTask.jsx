import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../../context/tasksContext'
import { TYPES } from '../../../models/taskActions'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { NotificationClass } from '../../../models/notification.class'
import { NotificationContext } from '../../context/notificationContext'
import { AuthContext } from '../../context/authContext'

/**
 * This component returns a button that completes the task
 * @param {string} param0 taskId is the id of the task to complete
 * @returns returns a button that completes the task
 */
const CompleteTask = ({ task }) => {
  const { setShowTask, showTask, dispatchTask } = useContext(TasksContext)
  const { setNotification } = useContext(NotificationContext)
  const { user } = useContext(AuthContext)
  /**
   * This function dispatches the action to the reducer
   */
  const handleOnClick = async () => {
    /**
     * Dispatch the action to the reducer
     */
    dispatchTask({
      type: TYPES.complete,
      payload: task.id
    })
    if (showTask) setShowTask({ ...showTask, isCompleted: !task.isCompleted })
    /**
     * Update the task in the database
     */
    try {
      /**
       * Get the document reference
       */
      const docRef = doc(db, 'tasks', user.uid, 'userTasks', task.id)
      /**
       * Update the document
       */
      await updateDoc(docRef, {
        isCompleted: !task.isCompleted
      })
    } catch {
      /**
       * If there is an error, show a notification
       */
      setNotification(new NotificationClass('Error', 'Error completing the task', 'error'))
    }
  }
  return (
    <button onClick={handleOnClick} className='w-min btn-icon'>
      <i className={task.isCompleted === false ? 'bi bi-check-circle-fill text-3xl' : 'bi bi-x-circle-fill text-3xl'}/>
    </button>
  )
}

CompleteTask.propTypes = {
  task: PropTypes.any
}

export default CompleteTask
