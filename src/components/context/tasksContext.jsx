import React, { createContext, useState } from 'react'

import PropTypes from 'prop-types'
import { LEVELS } from '../../models/levels.enum'
import { Task } from '../../models/task.class'

const TasksContext = createContext()

const TasksContextProvider = ({ children }) => {
  //  Task examples
  const task1 = new Task(
    1,
    'Ejemplo',
    'Descripción de ejemplo',
    LEVELS.NORMAL,
    false
  )

  const task2 = new Task(
    2,
    'Ejemplo2',
    'Descripción de ejemplo2',
    LEVELS.URGENT,
    true
  )

  const task3 = new Task(
    3,
    'Ejemplo3',
    'Descripción de ejemplo3',
    LEVELS.NORMAL,
    false
  )

  const task4 = new Task(
    4,
    'Ejemplo4',
    'Descripción de ejemplo4',
    LEVELS.NORMAL,
    true
  )

  // List of task examples
  const tasksList = [task1, task2, task3, task4]

  /**
   * useState for the tasklist as an array that contains the tasks
   */
  const [tasks, setTasks] = useState(tasksList)

  /**
   * function that deletes the task from the array tasks of the useState
   * @param {number} id of the task
   */
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  /**
   *
   * @param {string} name of the task
   * @param {string} description
   * @param {InstanceType} level as a instance of the class LEVELS
   */
  const createTask = (name, description, level) => {
    /**
     * Calling the function setTasks to push a new instance of the task class into the array
     */
    setTasks([...tasks, new Task(tasks.length + 1, name, description, level)])
  }

  /**
   * useState for show the form to create a new task
   */
  const [showNewTask, setShowNewTask] = useState(false)

  return (
        <TasksContext.Provider value ={{
          tasks,
          createTask,
          deleteTask,
          showNewTask,
          setShowNewTask
        }}>
            { children }
        </TasksContext.Provider>
  )
}

TasksContextProvider.propTypes = {
  children: PropTypes.any
}

export { TasksContext, TasksContextProvider }
