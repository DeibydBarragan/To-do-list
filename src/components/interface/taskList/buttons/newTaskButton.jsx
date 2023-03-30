import React, { useContext } from 'react'
import { btnVariants } from '../../../animations/btnAnim'
import { motion } from 'framer-motion'
import { TasksContext } from '../../../context/tasksContext'
import { createPortal } from 'react-dom'

const NewTaskButton = () => {
  const { setShowNewTask } = useContext(TasksContext)
  // Open modal for creating a new task
  const handleClickNewTask = () => {
    setShowNewTask(true)
  }
  return createPortal(
    <motion.button onClick={handleClickNewTask}
      variants={ btnVariants }
      initial='hidden'
      animate='show'
      whileHover='hover'
      exit='exit'
      className='font-semibold text-xl shadow-xl flex items-center fixed bottom-0 right-0 mb-4 mx-4 md:mb-16 md:mx-20 rounded-xl p-3 transition ease-in-out bg-gradient-to-tl from-indigo-600 to-fuchsia-600 z-10'
    >
      <i className="bi bi-plus-circle mr-2 text-2xl"></i>
        New task
    </motion.button>
    , document.body
  )
}

export default NewTaskButton
