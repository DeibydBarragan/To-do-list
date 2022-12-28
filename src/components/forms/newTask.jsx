import React, { useContext, useRef, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import PropTypes from 'prop-types'

const NewTask = () => {
  const { createTask, setShowNewTask } = useContext(TasksContext)

  const name = useRef('')
  const description = useRef('')
  const [level, setLevel] = useState('Urgency')
  const [open, setOpen] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowNewTask(false)
    createTask(name.current.value, description.current.value, level)
  }
  const handleCloseModal = (e) => {
    if (e.target.id === 'container') {
      setShowNewTask(false)
    }
  }

  const drop = useRef()
  const icon = useRef()
  const handleCloseDrop = (e) => {
    if (drop.current !== e.target && icon.current !== e.target) {
      setOpen(false)
    }
  }
  return (
        <div id='container' onClick={(e) => handleCloseModal(e)} className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm'>
            <form onClick={(e) => handleCloseDrop(e)} onSubmit={handleSubmit} className='flex flex-col gap-4 p-7 rounded-lg shadow-2xl bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700'>
              <h2>New task</h2>
              <input type='text' placeholder='Name' ref={name}/>
              <input type='text' placeholder='Description' ref={description}/>
              <div ref = {drop} className={`${level === 'Urgency' && 'text-gray-400'} bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl`}
              onClick={() => setOpen(!open)}
              >
                {level}
                <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}></i>
              </div>
              <ul className={`bg-slate-800 mt-56 divide-y divide-indigo-500 fixed z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
                  <li onClick={() => setLevel(LEVELS.NORMAL)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>Normal</li>
                  <li onClick={() => setLevel(LEVELS.URGENT)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-b-md'>Urgent</li>
              </ul>
              <button className='btn w-full'>Accept</button>
            </form>
        </div>
  )
}

NewTask.propTypes = {
  setShowNewTask: PropTypes.func
}

export default NewTask
