import React, { useContext, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { useForm } from 'react-hook-form'
import Modal from '../pure/modal/modal'
import { TYPES } from '../../models/taskActions'
import Select from './pure/select'
import Option from './pure/option'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { newTaskSchema } from './formSchema/newTaskSchema'
import Popover from './pure/popover'
import LoadingButton from './pure/loadingButton'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { AuthContext } from '../context/authContext'

/**
 * This component returns a form to create a new task
 * @param {setShowForm} param0 setShowForm is a function to set the state of the form to show or not
 * @returns returns a form to create a new task
 */
const NewTask = ({ setShowForm, showForm }) => {
  const { dispatchTask } = useContext(TasksContext)
  const { user } = useContext(AuthContext)
  const [formLoading, setFormLoading] = useState(false)
  /**
   * This manages the form
   */
  const { register, formState: { errors }, handleSubmit, reset, clearErrors } = useForm({
    resolver: yupResolver(newTaskSchema)
  })

  /**
   * state for task level
   */
  const [level, setLevel] = useState(null)

  /**
   *This function is ejected when te user submit the form
   * @param {InstanceType} data of the form
   */
  const onSubmit = async (data) => {
    setFormLoading(true)

    const taskLevel = level || LEVELS.NORMAL

    const task = {
      name: data.name,
      description: data.description,
      level: taskLevel,
      endDate: data.endDate,
      isCompleted: false
    }

    try {
      const tasksRef = collection(db, 'tasks', user.uid, 'userTasks')
      const snapshot = await addDoc(tasksRef, task)
      task.id = snapshot.id
      dispatchTask({
        type: TYPES.create,
        payload: task
      })
      setShowForm(false)
      reset()
    } catch (error) {
      console.error('Error adding task to database:', error)
      // Show an error message to the user or log the error
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <Modal setShow={setShowForm} show={showForm}>
      <form onSubmit={handleSubmit(onSubmit)} className='form-modal'>
        <h2>New task</h2>
        <input
          className='input-tasks'
          autoComplete="off"
          type='text'
          maxLength='50'
          placeholder='Name'
          {...register('name')}
        />
        <Popover show={errors.name?.message} clear={clearErrors} fieldName='name'/>
        <textarea
          className='input-tasks h-36'
          maxLength='200'
          autoComplete="off"
          placeholder='Description'
          {...register('description')}
        />
        <input
          type='date'
          className='input-tasks'
          {...register('endDate')}
        />
        <Select state={level} placeholder='Urgency'>
          {Object.values(LEVELS).map((props) => <Option key={props} set={setLevel}>{props}</Option>)}
        </Select>
        <button type='submit' className='btn-modal w-full'>
          Add task
          {formLoading
            ? <LoadingButton/>
            : <i className='bi bi-plus-circle text-2xl'/>
          }
        </button>
      </form>
    </Modal>
  )
}

NewTask.propTypes = {
  setShowForm: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired
}

export default NewTask
