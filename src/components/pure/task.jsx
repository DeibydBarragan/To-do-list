import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LEVELS } from '../../models/levels.enum'
import CompleteTask from '../forms/pure/completeTask'
import DeleteTask from '../forms/pure/deleteTask'
import EditTaskBtn from '../forms/pure/editTaskBtn'
import { motion } from 'framer-motion'
import { taskVariants } from '../animations/tasksAnim'
import { TasksContext } from '../context/tasksContext'

/**
 * Component that receives an instance of task and returns a card with the task information
 * @param {instance of task} param0
 * @returns
 */
const TaskComponent = ({ task }) => {
  const { setShowTask } = useContext(TasksContext)

  /**
   * This function shows the task information in a modal
   * @param {InstanceType} e event
   */
  const handleOnClickTask = (e) => {
    if (e.target.localName !== 'i') {
      setShowTask(task)
    }
  }

  return (
    <motion.div
      variants={taskVariants}
      initial='hidden'
      whileInView='whileInView'
      whileHover='hover'
      onClick={handleOnClickTask}
      className={`flex flex-col bg-gradient-to-tr shadow-xl ${task.level === LEVELS.URGENT ? 'order-first from-purple-800 to-orange-500' : 'from-indigo-700 to-fuchsia-600'
      } cursor-pointer rounded-2xl p-3 shadow-xl`}
    >
      <div className='mb-2'>
        <h4 className='break-words text-white'>
          { task.name }
        </h4>
        <p className='break-words text-white'>
          { task.endDate ? task.endDate : 'No end date' }
        </p>
        <p className='text-lg break-words text-white'>
          { task.description === ''
            ? 'Without description'
            : task.description.length <= 80 ? task.description : task.description.slice(0, 80) + '...' }
        </p>
      </div>
      <div className='mt-auto'>
        <h5 className={task.level === LEVELS.NORMAL ? 'text-gray-300' : 'text-white'}>
          { task.level }
        </h5>
        <div className='grid grid-cols-3 gap-2'>
          {/** Button to change the state of the taskt to complete */}
          <CompleteTask task={task}/>
          {/** Button to edit a task */}
          <EditTaskBtn task={task}/>
          {/** Button to delete a task */}
          <DeleteTask task={task}/>
        </div>
      </div>
    </motion.div>
  )
}

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired
}

export default TaskComponent
