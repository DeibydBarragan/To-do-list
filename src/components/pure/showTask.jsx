import React, { useContext } from 'react'
import Modal from './modal/modal'
import { TasksContext } from '../context/tasksContext'
import CompleteTask from '../forms/pure/completeTask'
import DeleteTask from '../forms/pure/deleteTask'
import EditTaskBtn from '../forms/pure/editTaskBtn'

const ShowTask = () => {
  const { tasks, showedTask, setShowTask } = useContext(TasksContext)

  const findTask = (element) => element.id === showedTask
  const task = tasks[tasks.findIndex(findTask)]
  return (
    <Modal setShow={setShowTask}>
      <div className='grid grid-cols-1'>
        <h2 className='break-words'>
          {task.name}
        </h2>
        <h4 className='break-words'>
          { task?.endDate }
        </h4>
        <h4 className='mt-2 break-words'>
          { task.description === ''
            ? 'Sin descripción'
            : task.description }
        </h4>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {/** Button to change the state of the taskt to complete */}
        <CompleteTask taskId={task.id}/>
        {/** Button to edit a task */}
        <EditTaskBtn taskId={task.id}/>
        {/** Button to delete a task */}
        <DeleteTask taskId={task.id}/>
      </div>
    </Modal>
  )
}

export default ShowTask
