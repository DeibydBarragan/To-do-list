import React from 'react'
import PropTypes from 'prop-types'
import { Task } from '../../models/task.class'

/**
 * Component that receives an instance of task and returns a card with the task information
 * @param {instance of task} param0
 * @returns
 */
const TaskComponent = ({ task, deleteTask }) => {
  return (
        <div className='bg-indigo-600 outline outline-1 outline-indigo-500 rounded-2xl p-3 shadow-xl transition ease-in-out hover:bg-indigo-800 hover:scale-105'>

            <div className=' col-span-9 cursor-pointer'>
                <h2 className='text-xl font-semibold'>
                    { task.name }
                </h2>
                <h4 className='text-lg col-end-11'>
                    { task.level }
                </h4>
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {/** Button to change the state of the taskt to complete */}
                <button className='transition ease-in-out hover:scale-110'>
                    <i className='bi bi-check-circle-fill text-3xl'></i>
                </button>
                {/** Button to edit a task */}
                <button className='col-start-11 transition ease-in-out hover:scale-110'>
                    <i className="bi bi-pencil-fill text-3xl"></i>
                </button>
                {/** Button to delete a task */}
                <button onClick={() => deleteTask(task.id)} className='col-start-12 transition ease-in-out hover:scale-110'>
                    <i className="bi bi-trash-fill text-3xl"></i>
                </button>
            </div>
        </div>
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
