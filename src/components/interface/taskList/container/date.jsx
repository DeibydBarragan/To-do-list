import { React, useContext } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import { dayToString, monthToString } from '../../../../helpers/dates'
import { FiltersContext } from '../../../context/filtersContext'
import { TasksContext } from '../../../context/tasksContext'
import { useSortTasks } from './../../../../hooks/useSortTasks'

const Date = () => {
  const { tasks } = useContext(TasksContext)
  const { filter } = useContext(FiltersContext)
  const sortedTasks = useSortTasks(tasks, filter)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  }
  return (
    <motion.div
      variants={ container }
      initial='hidden'
      animate='show'
      className='border-b-2 border-purple-500'
    >
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{filter}</h1>
      {/** weekday and month as strings */}
      <h4 className=' text-gray-800 dark:text-white'>
        {dayToString(moment().weekday())}, {monthToString(moment().month())},{' '}
        {moment().date()}
      </h4>
      <h2 className='mb-3 text-gray-800 dark:text-white'>
        {sortedTasks.length === 0 ? 'You don\'t have any task' : `You have ${sortedTasks.length} task(s)`}
      </h2>
    </motion.div>
  )
}

export default Date
