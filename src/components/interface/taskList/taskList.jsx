import React, { useContext } from 'react'
import TaskComponent from '../../pure/task'
import { TasksContext } from '../../context/tasksContext'
import { NavbarContext } from '../../context/navbarContext'
import NewTask from '../../forms/newTask'
import ShowTask from '../../pure/showTask'
import { FiltersContext } from '../../context/filtersContext'
import EditTask from '../../forms/editTask'
import { AnimatePresence } from 'framer-motion'
import NewTaskButton from './buttons/newTaskButton'
import { useSortTasks } from './../../../hooks/useSortTasks'
import Date from './container/date'

/**
 * Component that returns the list of tasks
 */
const TaskList = () => {
  const { tasks, showTask, showEditTask, showNewTask } = useContext(TasksContext)
  const { navbarOpen } = useContext(NavbarContext)
  const { filter } = useContext(FiltersContext)
  const sortedTasks = useSortTasks(tasks, filter)

  return (
    <div className={`${navbarOpen ? 'blur-sm' : ''} flex flex-col p-6 gap-3 col-span-12 lg:col-span-8 lg:ml-5 xl:ml-0`}>
      <Date/>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/** Iterate every element of tasklist to return a TaskComponent for each one */}
        {sortedTasks.map((task) => <TaskComponent task={task} key={`task${task.id}`}></TaskComponent>)}
      </div>
      <AnimatePresence>
        {!navbarOpen && <NewTaskButton/>}
        {showNewTask && <NewTask/>}
        {showTask && <ShowTask/>}
        {showEditTask && <EditTask/>}
      </AnimatePresence>
    </div>
  )
}

export default TaskList
