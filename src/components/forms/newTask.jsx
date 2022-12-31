import React, { useContext, useRef, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { LEVELS } from '../../models/levels.enum'
import { useForm } from 'react-hook-form'
import Modal from '../pure/modal/modal'
import { TYPES } from '../../models/taskActions'
import ModalFooter from '../pure/modal/modal.footer'
import ModalBody from '../pure/modal/modal.body'

const NewTask = () => {
  /**
   * Brings createTask and setShowNewTask functions from TasksContext
   */
  const { dispatchTask, setShowNewTask } = useContext(TasksContext)

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
    dispatchTask({
      type: TYPES.create,
      payload: { name: data.name, description: data.description, level: data.level }
    })
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
      <form className='gap-4'
        onClick={(e) => handleCloseDrop(e)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalBody>
          <div>
            <h2>New task</h2>
            <input className='w-full mt-4' autoComplete="off" type='text' maxLength='50' placeholder='Name' {...register('name', {
              required: true
            })} />
            <p>
              { errors.name?.type === 'required' && 'The name field is required'}
            </p>
            <textarea className='w-full mt-4 h-3/6' maxLength='200' autoComplete="off" type='text' placeholder='Description' {...register('description'
            )} />
            <div ref = {drop} className={`${level === null && 'text-gray-400'} bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl mt-2`}
              onClick={() => setOpen(!open)} >
              {level === null ? 'Urgency' : level}
              <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}/>
            </div>
            <ul className={`bg-slate-800 mt-2 divide-y divide-indigo-500 fixed z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
              <li onClick={() => setLevel(LEVELS.NORMAL)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>
                Normal
              </li>
              <li onClick={() => setLevel(LEVELS.URGENT)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-b-md'>
                Urgent
              </li>
            </ul>
          </div>
          <ModalFooter className='mt-auto'>
            <button type='submit' className='btn w-full'>Add task</button>
          </ModalFooter>
        </ModalBody>
      </form>
    </Modal>
  )
}

export default NewTask
