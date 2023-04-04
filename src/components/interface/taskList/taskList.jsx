import React, { useContext } from 'react'
import TaskComponent from '../../pure/task'
import { TasksContext } from '../../context/tasksContext'
import { NavbarContext } from '../../context/navbarContext'
import { FiltersContext } from '../../context/filtersContext'
import NewTaskButton from './buttons/newTaskButton'
import { useSortTasks } from './../../../hooks/useSortTasks'
import Date from './container/date'
import ShowTaskComponent from './../../pure/showTask'
import EditTask from './../../forms/editTask'

/**
 * Component that returns the list of tasks
 */
const TaskList = () => {
  const { tasks } = useContext(TasksContext)
  const { navbarOpen } = useContext(NavbarContext)
  const { filter } = useContext(FiltersContext)
  const sortedTasks = useSortTasks(tasks, filter)

  return (
    <main className={`${navbarOpen ? 'blur-sm' : ''} flex flex-col p-6 gap-3 col-span-12 lg:col-span-8 lg:ml-5 xl:ml-0`}>
      <Date/>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/** Iterate every element of tasklist to return a TaskComponent for each one */}
        {sortedTasks.map((task) => <TaskComponent task={task} key={`task${task.id}`}/>)}
      </div>
      {!navbarOpen && <NewTaskButton key='NewTaskButton'/>}
      <ShowTaskComponent/>
      <EditTask/>
    </main>
  )
}

export default TaskList
