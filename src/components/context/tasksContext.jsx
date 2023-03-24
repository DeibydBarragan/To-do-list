import React, { createContext, useReducer, useState } from 'react'
import { tasksList } from '../../helpers/taskExamples'
import PropTypes from 'prop-types'
import { Task } from '../../models/task.class'
import { TYPES } from '../../models/taskActions'

const TasksContext = createContext()

const TasksContextProvider = ({ children }) => {
  /**
   * This function executes different modifications on the tasklist state
   * @param {task} state of the tasks array
   * @param {type} action is the type of the action to execute
   * @returns new state of the array of tasks
   */
  const reducer = (state, action) => {
    switch (action.type) {
    /**
      * Delete the task of the state
      */
    case TYPES.delete: {
      return state.filter(task => task.id !== action.payload)
    }
    /**
      * push a new instance of the task class into the array
      */
    case TYPES.create: {
      return [...state, new Task(Math.random(), action.payload.name, action.payload.description, action.payload.level, action.payload.endDate, false)]
    }
    /**
       * complete a task
       */
    case TYPES.complete: {
      return state.map(task => {
        if (task.id === action.payload) {
          return new Task(task.id, task.name, task.description, task.level, task.endDate, !task.isCompleted)
        }
        return new Task(task.id, task.name, task.description, task.level, task.endDate, task.isCompleted)
      })
    }
    case TYPES.edit: {
      return state.map(task => {
        if (task.id === action.payload.id) {
          return new Task(task.id, action.payload.name, action.payload.description, action.payload.level, action.payload.endDate, task.isCompleted)
        }
        return new Task(task.id, task.name, task.description, task.level, task.endDate, task.isCompleted)
      })
    }
    default: return state
    }
  }
  /**
   * useReducer for the tasklist as an array that contains the tasks
   */
  const [tasks, dispatchTask] = useReducer(reducer, tasksList)

  const [showedTask, setShowedTask] = useState(null)
  /**
   * useState for show the form to create a new task
   */
  const [showNewTask, setShowNewTask] = useState(false)
  /**
   * useState for show the form to edit a task
   */
  const [showEditTask, setShowEditTask] = useState(false)
  /**
   * useState for show the details of a task
   */
  const [showTask, setShowTask] = useState(false)

  return (
    <TasksContext.Provider value ={{
      tasks,
      dispatchTask,
      showTask,
      setShowTask,
      showedTask,
      setShowedTask,
      showNewTask,
      setShowNewTask,
      showEditTask,
      setShowEditTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}

TasksContextProvider.propTypes = {
  children: PropTypes.any
}

export { TasksContext, TasksContextProvider }
