import React, { useContext, useEffect, useState } from 'react'
import Modal from '../pure/modal/modal'
import { useForm } from 'react-hook-form'
import { TasksContext } from '../context/tasksContext'
import Select from './pure/select'
import { LEVELS } from '../../models/levels.enum'
import Option from './pure/option'
import { TYPES } from '../../models/taskActions'

const EditTask = () => {
  const { dispatchTask, showEditTask, setShowEditTask } = useContext(TasksContext)
  const [level, setLevel] = useState()

  /**
   * state for the level of the task
   */
  useEffect(() => {
    setLevel(showEditTask?.level)
  }, [showEditTask])
  /**
   * Brings register to save the data form the form
   * handleSubmit is the name of the function that manage the form when it is submitted
   */
  const { register, formState: { errors }, handleSubmit } = useForm()

  const onSubmit = (data) => {
    data.name === '' && (data.name = showEditTask?.name)
    data.description === '' && (data.description = showEditTask?.description)
    // i declare a new propertie to save the level because it doesn't work if i use level directly (i don't know why)
    data.level = level
    setShowEditTask(false)
    /**
     * Dispatch the action to the reducer
     */
    dispatchTask({
      type: TYPES.edit,
      payload: { id: showEditTask?.id, name: data.name, description: data.description, level: data.level, endDate: data.endDate }
    })
  }

  return (
    <Modal setShow={setShowEditTask} show={showEditTask}>
      <form onSubmit={handleSubmit(onSubmit)} className='form-modal'>
        <h2>Edit task</h2>
        <input
          className='input-tasks'
          autoComplete="off"
          type='text'
          maxLength='50'
          placeholder={showEditTask?.name}
          {...register('name')}
        />
        { errors.name?.type === 'required' && <p>The name field is required</p>}
        <textarea
          className='input-tasks h-36'
          maxLength='200'
          autoComplete="off"
          placeholder={showEditTask?.description}
          {...register('description')}
        />

        <input
          type='date'
          placeholder={showEditTask?.endDate}
          className='input-tasks'
          {...register('endDate')}
        />
        <Select state={level} placeholder='Urgency'>
          {Object.values(LEVELS).map((props) => <Option key={props} set={setLevel}>{props}</Option>)}
        </Select>
        <button type='submit' className='btn-modal w-full'>Save</button>
      </form>
    </Modal>
  )
}

export default EditTask
