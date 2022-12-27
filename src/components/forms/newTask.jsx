import React, { useContext, useRef, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { H3, H2 } from '../pure/titles'
import { InputText } from '../pure/inputs'
import Button from '../pure/button'
import PropTypes from 'prop-types'

const NewTask = () => {
  const { createTask, setShowNewTask } = useContext(TasksContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState(null)
  const [open, setOpen] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowNewTask(false)
    createTask(name, description, level)
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
            <form onClick={(e) => handleCloseDrop(e)} onSubmit={handleSubmit} className='p-7 rounded-lg bg-indigo-700 shadow-2xl'>
              <H2>New task</H2>
              <H3>Name</H3>
              <InputText set={setName}/>
              <H3>Description</H3>
              <InputText set={setDescription}/>
              <div ref = {drop} className='bg-slate-800 mt-4 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl'
              onClick={() => setOpen(!open)}
              >
                Urgency
                <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}></i>
              </div>
              <ul className={`bg-slate-800 mt-2 divide-y divide-indigo-500 fixed z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
                  <li onClick={() => setLevel(LEVELS.NORMAL)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>Normal</li>
                  <li onClick={() => setLevel(LEVELS.URGENT)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-b-md'>Urgent</li>
              </ul>
              <Button color='bg-indigo-600' otherClasses=' mt-4 w-full shadow-xl hover:bg-indigo-500 hover:text-black'>Aceptar</Button>
            </form>
        </div>
  )
}

NewTask.propTypes = {
  setShowNewTask: PropTypes.func
}

export default NewTask
