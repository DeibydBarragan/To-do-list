import { React, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiltersContext } from '../../../context/filtersContext'
import { TasksContext } from '../../../context/tasksContext'
import { useSortTasks } from './../../../../hooks/useSortTasks'
import TodayDate from '../pure/todayDate'

/**
 * This component returns the date and the number of tasks
 * @returns returns the date and the number of tasks
 */
const Date = () => {
  const { tasks } = useContext(TasksContext)
  const { filter } = useContext(FiltersContext)
  /**
   * This function sorts the tasks by the filter
   */
  const sortedTasks = useSortTasks(tasks, filter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='border-b-2 border-purple-500'
    >
      <h1 className="text-5xl">
        {(filter?.charAt(0)?.toUpperCase() + filter?.slice(1)).toString()}
      </h1>
      {/** weekday and month as strings */}
      <TodayDate/>
      <h2 className='mb-3 text-slate-900'>
        {sortedTasks.length === 0 ? 'You don\'t have any task' : `You have ${sortedTasks.length} task(s)`}
      </h2>
    </motion.div>
  )
}

export default Date
