import React, { useContext, useRef, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { useForm } from 'react-hook-form'
import Modal from '../pure/modal'

const NewTask = () => {
  /**
   * Brings createTask and setShowNewTask functions from TasksContext
   */
  const { createTask, setShowNewTask } = useContext(TasksContext)

  /**
   * Brings register to save the data form
   * errors to manage errors
   * handleSubmit is the name of the function that manage the form when it is submitted
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
    createTask(data.name, data.description, data.level)
  }

  /**
   * state for the dropdown, when it is false, it isn't open
   */
  const [open, setOpen] = useState(false)
  const drop = useRef()
  const icon = useRef()
  /**
   *This function is for closing the dropdown when the user touches an element different to the icon or the drop button
   * @param {InstanceType} e event
   */
  const handleCloseDrop = (e) => {
    if (drop.current !== e.target && icon.current !== e.target) {
      setOpen(false)
    }
  }
  return (
    <Modal>
      <form onClick={(e) => handleCloseDrop(e)}
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 p-7 rounded-lg shadow-2xl bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700'
      >
        <h2>New task</h2>
        <input className='invalid:border-pink-500' autoComplete="off" type='text' placeholder='Name' {...register('name', {
          required: true,
          maxLength: 10
        })} />
        <p>
          { errors.name?.type === 'required' && 'The name field is required'}
          { errors.name?.type === 'maxLength' && 'The name field must have less than 10 chars'}
        </p>
        <textarea autoComplete="off" type='text' placeholder='Description' {...register('description', {
          maxLength: 100
        })} />
        <p>
          { errors.description?.type === 'maxLength' && 'The name field must have less than 50 chars'}
        </p>
        <div ref = {drop} className={`${level === null && 'text-gray-400'} bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl`}
          onClick={() => setOpen(!open)} >
          {level === null ? 'Urgency' : level}
          <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}/>
        </div>
        <ul className={`bg-slate-800 mt-56 divide-y divide-indigo-500 fixed z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
          <li onClick={() => setLevel(LEVELS.NORMAL)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>
            Normal
          </li>
          <li onClick={() => setLevel(LEVELS.URGENT)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-b-md'>
            Urgent
          </li>
        </ul>
        <button type='submit' className='btn w-full'>Accept</button>
      </form>
    </Modal>
  )
}

export default NewTask
