// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { LEVELS } from '../../models/levels.enum'
import { Task } from '../../models/task.class'
import TaskComponent from '../pure/task'
import Button from '../pure/button'
import moment from 'moment'
import { dayToString, monthToString } from '../../functions/dates'

/**
 * Component that returns the list of tasks
 */
const TaskList = () => {
  //  Task examples
  const task1 = new Task(
    1,
    'Ejemplo',
    'Descripción de ejemplo',
    false,
    LEVELS.NORMAL
  )

  const task2 = new Task(
    2,
    'Ejemplo2',
    'Descripción de ejemplo2',
    true,
    LEVELS.URGENT
  )

  const task3 = new Task(
    3,
    'Ejemplo3',
    'Descripción de ejemplo3',
    false,
    LEVELS.NORMAL
  )

  const task4 = new Task(
    4,
    'Ejemplo4',
    'Descripción de ejemplo4',
    true,
    LEVELS.NORMAL
  )

  // List of task examples
  const tasksList = [task1, task2, task3, task4]

  const [tasks, setTasks] = useState(tasksList)

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => {
      return task.id !== id
    }))
  }

  return (
    <div className="flex flex-col p-6 gap-3 col-span-8">
      <h1 className="text-5xl font-bold">Today</h1>
      {/** weekday and month as strings */}
      <h3 className="text-2xl font-semibold ">
        {dayToString(moment().weekday())}, {monthToString(moment().month())},{' '}
        {moment().date()}
      </h3>
      <div className="grid gap-3 cols-12">
        <div className="flex flex-row border-b-2 border-indigo-400">
          <h3 className="text-4xl font-semibold mb-3">
            {tasks.length === 0 ? 'You don\'t have any task' : `You have ${tasks.length} task(s)`}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/** Iterate every element of tasklist to return a TaskComponent for each one */}
          {tasks.map((task, i) => {
            return <TaskComponent task={task} key={task.id} deleteTask = {deleteTask}></TaskComponent>
          })}
        </div>
        <Button otherClasses="flex items-center fixed bottom-0 right-0 mb-16 mx-20 rounded-xl p-3 hover:scale-110">
          <i className="bi bi-plus-circle mr-2 text-2xl"></i>
          New task
        </Button>
      </div>
    </div>
  )
}

export default TaskList
