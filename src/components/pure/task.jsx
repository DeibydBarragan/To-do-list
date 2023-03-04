import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Task } from '../../models/task.class'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { ModalContext } from '../context/ModalContext'
import CompleteTask from '../forms/pure/completeTask'
import DeleteTask from '../forms/pure/deleteTask'
import EditTaskBtn from '../forms/pure/editTaskBtn'
import { motion, AnimatePresence } from 'framer-motion'

const taskVariants = {
  key: 'box',
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { dutation: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 2 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 }
  }
}
/**
 * Component that receives an instance of task and returns a card with the task information
 * @param {instance of task} param0
 * @returns
 */
const TaskComponent = ({ task }) => {
  const { setShowTask, setShowedTask } = useContext(TasksContext)
  const { setModalOpen } = useContext(ModalContext)

  const handleOnClickTask = (e) => {
    if (e.target.localName !== 'i') {
      setShowedTask(task.id)
      setShowTask(true)
      setModalOpen(true)
    }
  }

  return (
        <AnimatePresence>
          <motion.div
              variants={taskVariants}
              initial='hidden'
              animate='visible'
              whileHover='hover'
              exit='exit'
              onClick={handleOnClickTask}
              className={`flex flex-col bg-gradient-to-tr ${task.level === LEVELS.URGENT ? 'order-first from-purple-800 to-orange-500' : 'from-indigo-700 to-fuchsia-600'
              } cursor-pointer rounded-2xl p-3 shadow-xl`}
          >
              <div className='mb-2'>
                  <h4 className='break-words'>
                    { task.name }
                  </h4>
                  <p className='break-words'>
                    { task.endDate ? task.endDate : 'Sin fecha' }
                  </p>
                  <p className='text-lg break-words'>
                      { task.description === ''
                        ? 'Sin descripción'
                        : task.description.length <= 80 ? task.description : task.description.slice(0, 80) + '...' }
                  </p>
              </div>
              <div className='mt-auto'>
                  <h5 className={task.level === LEVELS.NORMAL ? 'text-gray-300' : ''}>
                      { task.level }
                  </h5>
                  <div className='grid grid-cols-3 gap-2'>
                      {/** Button to change the state of the taskt to complete */}
                      <CompleteTask taskId={task.id}/>
                      {/** Button to edit a task */}
                      <EditTaskBtn taskId={task.id}/>
                      {/** Button to delete a task */}
                      <DeleteTask taskId={task.id}/>
                  </div>
              </div>
          </motion.div>
        </AnimatePresence>
  )
}

/**
 * Task must be an instance of task
 */
TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task),
  deleteTask: PropTypes.func
}

export default TaskComponent
