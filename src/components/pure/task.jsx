import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Task } from '../../models/task.class'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import ShowTask from './showTask'
import { TYPES } from '../../models/taskActions'

/**
 * Component that receives an instance of task and returns a card with the task information
 * @param {instance of task} param0
 * @returns
 */
const TaskComponent = ({ task }) => {
  const { dispatchTask, showTask, setShowTask } = useContext(TasksContext)

  const [isCompleted, setIsCompleted] = useState(task.isCompleted)

  return (
        <div onClick={() => setShowTask(false)}
            className={`flex flex-col bg-gradient-to-tr ${task.level === LEVELS.URGENT ? 'order-first from-purple-800 to-orange-500' : 'from-indigo-700 to-fuchsia-600'} cursor-pointer rounded-2xl p-3 shadow-xl transition ease-in-out hover:scale-105`}
        >
            <div className='mb-2'>
                <h4 className='break-words'>
                    { task.name }
                </h4>
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
                    <button onClick={() => setIsCompleted(!isCompleted)} className='btn-icon w-min'>
                        <i className={isCompleted === false ? 'bi bi-check-circle-fill text-3xl' : 'bi bi-x-circle-fill text-3xl'}/>
                    </button>
                    {/** Button to edit a task */}
                    <button className='col-start-11 btn-icon'>
                        <i className='bi bi-pencil-fill text-3xl'/>
                    </button>
                    {showTask && <ShowTask/>}
                    {/** Button to delete a task */}
                    <button onClick={() => dispatchTask({
                      type: TYPES.delete,
                      payload: task.id
                    })} className='col-start-12 btn-icon'>
                        <i className="bi bi-trash-fill text-3xl"/>
                    </button>
                </div>
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
