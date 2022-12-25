import React, { useContext, useRef } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'

const NewTask = () => {
  const { createTask } = useContext(TasksContext)

  const name = useRef(null)
  const description = useRef(null)
  const level = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      name: name.current.value,
      description: name.current.value,
      level: level.current.value
    }
    createTask(newTask)
  }

  return (
        <form onSubmit={handleSubmit}>
            <input type='text' ref={name} className='bg-black'></input>
            <input type='text' ref={description} className='bg-black'></input>
            <select ref={level}>
                <option value={LEVELS.NORMAL}>Normal</option>
                <option value={LEVELS.URGENT}>Urgent</option>
            </select>
            <button type='submit'>Aceptar</button>
        </form>
  )
}

export default NewTask
