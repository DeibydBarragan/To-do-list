// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import TaskComponent from '../pure/task'
import Button from '../pure/button'
import moment from 'moment'
import { dayToString, monthToString } from '../../functions/dates'
import { TasksContext } from '../context/tasksContext'
import NewTask from '../forms/newTask'
import { H3, H2, H1 } from '../pure/titles'

/**
 * Component that returns the list of tasks
 */
const TaskList = () => {
  const { tasks, showNewTask, setShowNewTask } = useContext(TasksContext)

  return (
    <div className="flex flex-col p-6 gap-3 col-span-8">
      <H1 className="text-5xl font-bold">Today</H1>
      {/** weekday and month as strings */}
      <H3>
        {dayToString(moment().weekday())}, {monthToString(moment().month())},{' '}
        {moment().date()}
      </H3>
      <div className="grid gap-3 cols-12">
        <div className="flex flex-row border-b-2 border-indigo-400">
          <H2>
            {tasks.length === 0 ? 'You don\'t have any task' : `You have ${tasks.length} task(s)`}
          </H2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/** Iterate every element of tasklist to return a TaskComponent for each one */}
          {tasks.map((task, i) => <TaskComponent task={task} key={i}></TaskComponent>)}
        </div>
        <Button onClick={() => setShowNewTask(true)} otherClasses="flex items-center fixed bottom-0 right-0 mb-16 mx-20 rounded-xl p-3 hover:scale-110">
          <i className="bi bi-plus-circle mr-2 text-2xl"></i>
          New task
        </Button>
        {showNewTask && <NewTask set={setShowNewTask}></NewTask>}
      </div>
    </div>
  )
}

export default TaskList
