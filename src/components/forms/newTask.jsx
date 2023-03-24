import React, { useContext, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { useForm } from 'react-hook-form'
import Modal from '../pure/modal/modal'
import { TYPES } from '../../models/taskActions'
import ModalFooter from '../pure/modal/modal.footer'
import ModalBody from '../pure/modal/modal.body'
import Select from './pure/select'
import Option from './pure/option'

const NewTask = () => {
  /**
   * Brings createTask function from TasksContext
   */
  // eslint-disable-next-line no-unused-vars
  const { dispatchTask, setShowNewTask } = useContext(TasksContext)

  /**
   * Brings register to save the data form
   * errors to manage errors
   * handleSubmit is to manage the form when it is submitted
   */
  const { register, formState: { errors }, handleSubmit } = useForm()

  /**
   * state for the level of the task
   */
  const [level, setLevel] = useState(null)

  /**
   *This function is ejected when te user submit the form
   * @param {InstanceType} data of the form
   */
  const onSubmit = (data) => {
    // i declare a new propertie to save the level because it doesn't work if i use level directly (i don't know why)
    data.level = level
    /**
     * if the user doesn't choose a level, it will be normal
     */
    data.level === null && (data.level = LEVELS.NORMAL)
    // Close de form
    setShowNewTask(false)
    // setShowNewTask(false)
    dispatchTask({
      type: TYPES.create,
      payload: { name: data.name, description: data.description, level: data.level, endDate: data.endDate }
    })
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <h2>New task</h2>
          <input
            className='input-tasks mt-4'
            autoComplete="off"
            type='text'
            maxLength='50'
            placeholder='Name'
            {...register('name', { required: true })}
          />
          <p>
            { errors.name?.type === 'required' && 'The name field is required'}
          </p>
          <textarea
            className='input-tasks mt-3'
            maxLength='200'
            autoComplete="off"
            placeholder='Description'
            {...register('description')}
          />
          <input
            type='date'
            className='input-tasks mt-3'
            {...register('endDate')}
          />
          <Select state={level} placeholder='Urgency'>
            {Object.values(LEVELS).map((props) => <Option key={props} set={setLevel}>{props}</Option>)}
          </Select>
          <ModalFooter>
            <button type='submit' className='btn w-full'>Add task</button>
          </ModalFooter>
        </ModalBody>
      </form>
    </Modal>
  )
}

export default NewTask
