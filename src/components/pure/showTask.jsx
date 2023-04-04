import React, { useContext } from 'react'
import Modal from './modal/modal'
import CompleteTask from '../forms/pure/completeTask'
import DeleteTask from '../forms/pure/deleteTask'
import EditTaskBtn from '../forms/pure/editTaskBtn'
import { TasksContext } from '../context/tasksContext'

const ShowTaskComponent = () => {
  const { setShowTask, showTask } = useContext(TasksContext)
  return (
    <Modal setShow={setShowTask} show={showTask}>
      <div className='grid grid-cols-1 border-b border-gray-400 dark:border-gray-700 mb-3 pb-3 p-4'>
        <h2 className='break-words'>
          {showTask?.name}
        </h2>
        <h4 className='break-words'>
          { showTask?.endDate }
        </h4>
        <h4 className='mt-2 break-words'>
          { showTask?.description === ''
            ? 'Sin descripción'
            : showTask?.description }
        </h4>
      </div>
      <div className='grid grid-cols-3 gap-2 text-indigo-900 dark:text-white'>
        {/** Button to change the state of the taskt to complete */}
        <CompleteTask taskId={showTask?.id}/>
        {/** Button to edit a task */}
        <EditTaskBtn task={showTask}/>
        {/** Button to delete a task */}
        <DeleteTask taskId={showTask?.id}/>
      </div>
    </Modal>
  )
}

export default ShowTaskComponent
