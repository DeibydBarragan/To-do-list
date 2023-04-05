import React, { useContext, useState } from 'react'
import { btnVariants } from '../../../animations/btnAnim'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import NewTask from '../../../forms/newTask'
import { NavbarContext } from '../../../context/navbarContext'

const NewTaskButton = () => {
  const [showForm, setShowForm] = useState(false)
  const { navbarOpen } = useContext(NavbarContext)
  // Open modal for creating a new task
  const handleClickNewTask = () => {
    setShowForm(true)
  }
  return createPortal(
    <div>
      <AnimatePresence>
        { !navbarOpen &&
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
          </motion.button>}
      </AnimatePresence>
      <NewTask setShowForm={setShowForm} showForm={showForm}/>
    </div>
    , document.body
  )
}

export default NewTaskButton
