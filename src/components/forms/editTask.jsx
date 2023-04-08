import React, { useContext, useEffect, useState } from 'react'
import Modal from '../pure/modal/modal'
import { useForm } from 'react-hook-form'
import { TasksContext } from '../context/tasksContext'
import Select from './pure/select'
import { LEVELS } from '../../models/levels.enum'
import Option from './pure/option'
import { TYPES } from '../../models/taskActions'
import { newTaskSchema } from './formSchema/newTaskSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import Popover from './pure/popover'
import LoadingButton from './pure/loadingButton'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { AuthContext } from '../context/authContext'
import { NotificationContext } from '../context/notificationContext'
import { NotificationClass } from '../../models/notification.class'
import CalendarComponent from './pure/calendarComponent'
import TitleForm from './pure/titleForm'

const EditTask = () => {
  const { dispatchTask, showEditTask, setShowEditTask, showTask, setShowTask } = useContext(TasksContext)
  const { user } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [level, setLevel] = useState()
  const [formLoading, setFormLoading] = useState(false)
  const [date, setDate] = useState('')

  /**
   * state for the level of the task
   */
  useEffect(() => {
    setLevel(showEditTask?.level)
    setDate(showEditTask?.endDate)
  }, [showEditTask])
  /**
   * Brings register to save the data form the form
   * handleSubmit is the name of the function that manage the form when it is submitted
   */
  const { register, formState: { errors }, handleSubmit, clearErrors, reset } = useForm({
    resolver: yupResolver(newTaskSchema)
  })

  const onSubmit = async (data) => {
    setFormLoading(true)
    data.name === '' && (data.name = showEditTask?.name)
    data.description === '' && (data.description = showEditTask?.description)
    // i declare a new propertie to save the level because it doesn't work if i use level directly (i don't know why)
    data.level = level

    try {
      /**
       * Get the document reference
       */
      const docRef = doc(db, 'tasks', user.uid, 'userTasks', showEditTask?.id)
      /**
       * Update the document
       */
      await updateDoc(docRef, {
        name: data.name,
        description: data.description,
        level: data.level,
        endDate: date
      })
      /**
      * Dispatch the action to the reducer
      */
      dispatchTask({
        type: TYPES.edit,
        payload: { id: showEditTask?.id, name: data.name, description: data.description, level: data.level, endDate: date }
      })
      if (showTask) {
        setShowTask({
          ...showTask,
          name: data.name,
          description: data.description,
          level: data.level,
          endDate: date
        })
      }
      setShowEditTask(false)
      reset()
    } catch (error) {
      /**
       * Something went wrong
       */
      setNotification(new NotificationClass('Error', 'There was an error while editing the task', 'error'))
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <Modal setShow={setShowEditTask} show={showEditTask}>
      <form onSubmit={handleSubmit(onSubmit)} className='form-modal'>
        <TitleForm>Edit task</TitleForm>
        {/** Task name */}
        <label>Name</label>
        <div className='relative w-full'>
          <input
            className='input-tasks w-full'
            autoComplete="off"
            type='text'
            maxLength='50'
            defaultValue={showEditTask?.name}
            {...register('name')}
          />
          <Popover show={errors.name?.message} clear={clearErrors} fieldName='name'/>
        </div>
        {/** Task description */}
        <label>Description</label>
        <textarea
          className='input-tasks h-36'
          maxLength='200'
          autoComplete="off"
          defaultValue={showEditTask?.description}
          {...register('description')}
        />
        {/** Task end date */}
        <label>End Date</label>
        <CalendarComponent
          date={date}
          setDate={setDate}
        />
        {/** Task level */}
        <label>Urgency</label>
        <Select state={level} placeholder='Urgency'>
          {Object.values(LEVELS).map((props) => <Option key={props} set={setLevel}>{props}</Option>)}
        </Select>
        {/** Task save button */}
        <button type='submit' className='btn-modal w-full'>
          Save
          {formLoading
            ? <LoadingButton/>
            : <i className='bi bi-pen text-2xl'/>
          }
        </button>
      </form>
    </Modal>
  )
}

export default EditTask
