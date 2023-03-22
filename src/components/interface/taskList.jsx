/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import TaskComponent from '../pure/task'
import moment from 'moment'
import { dayToString, monthToString } from '../../helpers/dates'
import { TasksContext } from '../context/tasksContext'
import { NavbarContext } from '../context/navbarContext'
import NewTask from '../forms/newTask'
import ShowTask from '../pure/showTask'
import { ModalContext } from '../context/ModalContext'
import { FiltersContext } from '../context/filtersContext'
import EditTask from '../forms/editTask'
import { FILTERS } from '../../models/filters.enum'
import { motion, AnimatePresence } from 'framer-motion'
import { btnVariants } from '../animations/btnAnim'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
}

/**
 * Component that returns the list of tasks
 */
const TaskList = () => {
  const { tasks, showTask, showEditTask, showNewTask, setShowNewTask } = useContext(TasksContext)
  const { modalOpen, setModalOpen } = useContext(ModalContext)
  const { navbarOpen } = useContext(NavbarContext)
  const { filter } = useContext(FiltersContext)
  // Function to sort the tasks by their date
  const sortByDate = (taskA, taskB) => {
    if (taskA.endDate < taskB.endDate) {
      return -1
    } else if (taskA.endDate > taskB.endDate) {
      return 1
    } else {
      return 0
    }
  }
  // Function to filter tasks
  const filterTasks = (task) => {
    switch (filter) {
      case FILTERS.ALL: return !task.isCompleted
      case FILTERS.TODAY: return task?.endDate === moment().format('YYYY-MM-DD') && !task.isCompleted
      case FILTERS.COMPLETED: return task.isCompleted
      case FILTERS.NEXTSEVEN: {
        const taskDate = moment(task.endDate)
        const difference = taskDate.diff(moment(), 'days')
        return difference <= 7 && difference >= 0
      }
    }
  }
  const sortedTasks = tasks.sort(sortByDate).filter(filterTasks)

  // Open modal for creating a new task
  const handleClickNewTask = () => {
    setModalOpen(true)
    setShowNewTask(true)
  }

  return (
      <div className={`${navbarOpen ? 'blur-sm' : ''} flex flex-col p-6 gap-3 col-span-12 lg:col-span-8 lg:ml-5 xl:ml-0`}>
        <motion.div
          variants={ container }
          initial='hidden'
          animate='show'
        >
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{filter}</h1>
          {/** weekday and month as strings */}
          <h4 className=' text-gray-800 dark:text-white'>
            {dayToString(moment().weekday())}, {monthToString(moment().month())},{' '}
            {moment().date()}
          </h4>
        </motion.div>
        <div className="grid grid-cols gap-3">
          <motion.div
            variants={ container }
            initial='hidden'
            animate='show'
            className="flex flex-row border-b-2 border-purple-500">
            <h2 className='mb-3 text-gray-800 dark:text-white'>
              {sortedTasks.length === 0 ? 'You don\'t have any task' : `You have ${sortedTasks.length} task(s)`}
            </h2>
          </motion.div>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 2xl:grid-cols-4">
            {/** Iterate every element of tasklist to return a TaskComponent for each one */}
            {sortedTasks.map((task) => <TaskComponent task={task} key={task.id}></TaskComponent>)}
          </div>
          <motion.button onClick={handleClickNewTask}
            variants={ btnVariants }
            initial='hidden'
            animate='show'
            whileHover='hover'
            className='font-semibold text-xl shadow-xl flex items-center fixed bottom-0 right-0 mb-4 mx-4 md:mb-16 md:mx-20 rounded-xl p-3 transition ease-in-out bg-gradient-to-tl from-indigo-600 to-fuchsia-600 hover:drop-shadow-xl z-10'>
            <i className="bi bi-plus-circle mr-2 text-2xl"></i>
            New task
          </motion.button>
          {showNewTask && modalOpen && <NewTask/>}
          {showTask && modalOpen && <ShowTask/>}
          {showEditTask && modalOpen && <EditTask/>}
        </div>
      </div>
  )
}

export default TaskList
