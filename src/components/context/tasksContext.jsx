import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './authContext'
import { useReduceTasks } from '../../hooks/useReduceTasks'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { NotificationClass } from '../../models/notification.class'
import { Task } from '../../models/task.class'

const TasksContext = createContext()

const TasksContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const { setNotification } = useContext(AuthContext)

  const [loadingTasks, setLoadingTasks] = useState(false)

  /**
   * useReducer for the tasklist as an array that contains the tasks
   */
  const [tasks, dispatchTask] = useReducer(useReduceTasks, [], user?.uid)
  /**
   * Showtask is the task that is going to be shown in the modal in showTask component
   */
  const [showTask, setShowTask] = useState(null)
  /**
   * ShowEditTask is the task that is going to be shown in the modal in EditTask component
   */
  const [showEditTask, setShowEditTask] = useState(null)

  /**
   * This useEffect is going to be executed when the user is logged
   */
  useEffect(() => {
    const getTasks = async () => {
      /**
       * If the user is logged, get the tasks from the database
       */
      if (user) {
        setLoadingTasks(true)
        try {
          /**
           * Query the database to get the tasks that belongs to the user
           */
          const ref = collection(db, 'tasks', user.uid, 'userTasks')
          const querySnapshot = await getDocs(ref)
          /**
           * Map the querySnapshot to an array of tasks
           */
          const docs = querySnapshot.docs.map((doc) => {
            return new Task(
              doc.id,
              doc.data().name,
              doc.data().description,
              doc.data().level,
              doc.data().endDate,
              doc.data().isCompleted
            )
          })
          /**
           * Dispatch the load action to the reducer
           */
          dispatchTask({ type: 'load', payload: docs })
        } catch {
          /**
           * Something went wrong, set the notification
           */
          setNotification(new NotificationClass('error', 'Error', 'Error loading your tasks'))
        } finally {
          setLoadingTasks(false)
        }
        /**
         * If the user is not logged, set the tasks to an empty array
         */
      } else {
        dispatchTask({ type: 'load', payload: [] })
      }
    }
    getTasks()
  }, [user])

  return (
    <TasksContext.Provider value ={{
      tasks,
      dispatchTask,
      showTask,
      setShowTask,
      showEditTask,
      setShowEditTask,
      loadingTasks,
      setLoadingTasks
    }}>
      { children }
    </TasksContext.Provider>
  )
}

TasksContextProvider.propTypes = {
  children: PropTypes.any
}

export { TasksContext, TasksContextProvider }
