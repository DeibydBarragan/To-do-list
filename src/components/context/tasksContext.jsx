import React, { createContext, useReducer, useState } from 'react'

import PropTypes from 'prop-types'
import { LEVELS } from '../../models/levels.enum'
import { Task } from '../../models/task.class'
import { TYPES } from '../../models/taskActions'

const TasksContext = createContext()

const TasksContextProvider = ({ children }) => {
  //  Task examples
  const task1 = new Task(
    Math.random(),
    'Ejemplo',
    'Descripción de ejemplo',
    LEVELS.NORMAL,
    null,
    false
  )

  const task2 = new Task(
    Math.random(),
    'Ejemplo2',
    'Descripción de ejemplo2',
    LEVELS.URGENT,
    null,
    true
  )

  const task3 = new Task(
    Math.random(),
    'Ejemplo3',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaa',
    LEVELS.NORMAL,
    null,
    false
  )

  const task4 = new Task(
    Math.random(),
    'Ejemplo4',
    'Descripción de ejemplo4',
    LEVELS.NORMAL,
    null,
    true
  )

  // List of task examples
  const tasksList = [task1, task2, task3, task4]

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
