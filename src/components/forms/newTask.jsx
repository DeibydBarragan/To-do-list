import React, { useContext, useRef, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Modal from '../pure/modal'

const NewTask = () => {
  const { createTask, setShowNewTask } = useContext(TasksContext)

  const { register, formState: { errors }, handleSubmit } = useForm()

  const [level, setLevel] = useState(null)
  const [open, setOpen] = useState(false)

  const onSubmit = (data) => {
    data.level = level
    data.level === null && (data.level = LEVELS.NORMAL)
    setShowNewTask(false)
    createTask(data.name, data.description, data.level)
  }

  const drop = useRef()
  const icon = useRef()
  const handleCloseDrop = (e) => {
    if (drop.current !== e.target && icon.current !== e.target) {
      setOpen(false)
    }
  }
  return (
    <Modal>
      <form onClick={(e) => handleCloseDrop(e)} onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-7 rounded-lg shadow-2xl bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700'>
        <h2>New task</h2>
        <input autoComplete="off" type='text' placeholder='Name' {...register('name', {
          required: true,
          maxLength: 10
        })} />
        { errors.name?.type === 'required' && <p>The name field is required</p>}
        { errors.name?.type === 'maxLength' && <p>The name field must have less than 10 chars</p>}
        <textarea autoComplete="off" type='text' placeholder='Description' {...register('description', {
          maxLength: 100
        })} />
        { errors.description?.type === 'maxLength' && <p>The name field must have less than 50 chars</p>}
        <div ref = {drop} className={`${level === null && 'text-gray-400'} bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl`}
          onClick={() => setOpen(!open)} >
          {level === null ? 'Urgency' : level}
          <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}></i>
        </div>
        <ul className={`bg-slate-800 mt-56 divide-y divide-indigo-500 fixed z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
          <li onClick={() => setLevel(LEVELS.NORMAL)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>Normal</li>
          <li onClick={() => setLevel(LEVELS.URGENT)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-b-md'>Urgent</li>
        </ul>
        <button type='submit' className='btn w-full'>Accept</button>
      </form>
    </Modal>
  )
}

NewTask.propTypes = {
  setShowNewTask: PropTypes.func
}

export default NewTask
