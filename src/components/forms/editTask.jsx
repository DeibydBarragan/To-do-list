import React, { useContext, useState } from 'react'
import Modal from '../pure/modal/modal'
import { useForm } from 'react-hook-form'
import { TasksContext } from '../context/tasksContext'
import Select from './pure/select'
import { LEVELS } from '../../models/levels.enum'
import Option from './pure/option'
import { TYPES } from '../../models/taskActions'

const EditTask = () => {
  const { tasks, showedTask, dispatchTask, setShowEditTask } = useContext(TasksContext)

  const findTask = (element) => element.id === showedTask
  const task = tasks[tasks.findIndex(findTask)]

  /**
   * state for the level of the task
   */
  const [level, setLevel] = useState(task.level)
  /**
   * Brings register to save the data form
   * errors to manage errors
   * handleSubmit is the name of the function that manage the form when it is submitted
   */
  const { register, formState: { errors }, handleSubmit } = useForm()

  const onSubmit = (data) => {
    data.name === '' && (data.name = task.name)
    data.description === '' && (data.description = task.description)
    // i declare a new propertie to save the level because it doesn't work if i use level directly (i don't know why)
    data.level = level
    // Close de form
    setShowEditTask(false)
    // setShowNewTask(false)
    dispatchTask({
      type: TYPES.edit,
      payload: { id: task.id, name: data.name, description: data.description, level: data.level, endDate: data.endDate }
    })
  }

  return (
    <Modal setShow={setShowEditTask}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <h2>Edit task</h2>
        <input
          className='input-tasks'
          autoComplete="off"
          type='text'
          maxLength='50'
          placeholder={task.name}
          {...register('name')}
        />
        { errors.name?.type === 'required' && <p>The name field is required</p>}
        <textarea
          className='input-tasks'
          maxLength='200'
          autoComplete="off"
          placeholder={task?.description}
          {...register('description')}
        />

        <input
          type='date'
          placeholder={task?.endDate}
          className='input-tasks'
          {...register('endDate')}
        />
        <Select state={level} placeholder='Urgency'>
          {Object.values(LEVELS).map((props) => <Option key={props} set={setLevel}>{props}</Option>)}
        </Select>
        <button type='submit' className='btn w-full'>Save</button>
      </form>
    </Modal>
  )
}

export default EditTask
