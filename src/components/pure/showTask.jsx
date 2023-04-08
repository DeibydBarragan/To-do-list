import React, { useContext } from 'react'
import Modal from './modal/modal'
import CompleteTask from '../forms/pure/completeTask'
import DeleteTask from '../forms/pure/deleteTask'
import EditTaskBtn from '../forms/pure/editTaskBtn'
import { TasksContext } from '../context/tasksContext'

/**
 * This component returns a modal with the information of a task
 * @returns returns a modal with the information of a task
 */
const ShowTaskComponent = () => {
  const { setShowTask, showTask } = useContext(TasksContext)
  return (
    <Modal setShow={setShowTask} show={showTask}>
      <div className='grid grid-cols-1 border-b border-gray-300 dark:border-gray-800 mb-3 pb-3 p-4'>
        <h2 className='break-words border-b pb-2 border-b-gray-300 dark:border-gray-800'>
          {showTask?.name}
        </h2>
        <h4 className='mt-2 break-words'>
          { showTask?.description === ''
            ? 'Sin descripción'
            : showTask?.description }
        </h4>
        <h4 className='break-words'>
          { showTask?.endDate
            ? `End date: ${showTask?.endDate}`
            : 'Without end date'
          }
        </h4>
        <h4 className='mt-2 break-words'>
          { showTask?.level && `Urgency: ${showTask?.level}` }
        </h4>
      </div>
      <div className='grid grid-cols-3 gap-2 text-indigo-900 dark:text-white'>
        {/** Button to change the state of the taskt to complete */}
        <CompleteTask task={showTask}/>
        {/** Button to edit a task */}
        <EditTaskBtn task={showTask}/>
        {/** Button to delete a task */}
        <DeleteTask task={showTask}/>
      </div>
    </Modal>
  )
}

export default ShowTaskComponent
