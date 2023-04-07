import { React, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiltersContext } from '../../../context/filtersContext'
import { TasksContext } from '../../../context/tasksContext'
import { useSortTasks } from './../../../../hooks/useSortTasks'
import TodayDate from '../pure/todayDate'
import { toUpperFirstChar } from '../../../../helpers/upperFirstChar'

/**
 * This component returns the date and the number of tasks
 * @returns returns the date and the number of tasks
 */
const Date = () => {
  const { tasks, loadingTasks } = useContext(TasksContext)
  const { filter } = useContext(FiltersContext)
  const [sortedTasks, setSortedTasks] = useState([])
  /**
   * This function sorts the tasks by the filter
   */
  useEffect(() => {
    if (tasks) {
      setSortedTasks(useSortTasks(tasks, filter))
    }
  }, [tasks, filter])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='border-b-2 border-purple-500'
    >
      <h1 className="text-5xl">
        {filter && toUpperFirstChar(filter)}
      </h1>
      {/** weekday and month as strings */}
      <TodayDate/>
      <h2 className='mb-3 text-slate-900'>
        {
          loadingTasks
            ? 'Loading...'
            : sortedTasks.length === 0 ? 'You don\'t have any task' : `You have ${sortedTasks.length} task(s)`
        }
      </h2>
    </motion.div>
  )
}

export default Date
