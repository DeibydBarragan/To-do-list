import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import Modal from '../../../../../components/pure/modal/modal'
import { AnimatePresence } from 'framer-motion'
import { chooseNameSchema } from './../../../../../components/forms/formSchema/chooseNameSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Popover from '../../../../../components/forms/pure/popover'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { updateProfile } from 'firebase/auth'

const ChangeUsername = () => {
  const { user, setUser } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, setError, reset } = useForm({
    resolver: yupResolver(chooseNameSchema)
  })

  const onSubmit = async (data) => {
    setFormLoading(true)
    try {
      // Update the username
      updateProfile(user, { displayName: data.username })
      // set the new username
      setUser({ ...user, displayName: data.username })
      setShowForm(false)
    } catch (e) {
      setError('username', { message: 'Error changing username' })
    }
    setFormLoading(false)
    reset()
  }

  return (
    <div className='flex flex-col pt-4 pb-4'>
      <p className='text-gray-900 dark:text-white' >Username</p>
      <div className='flex items-center justify-between'>
        <h4 className='text-gray-900 dark:text-white'>{ user.displayName }</h4>
        <button className='btn-settings' onClick={() => setShowForm(true)}>
          Change
          <i className='bi bi-pencil-square text-2xl'/>
        </button>
      </div>
      <AnimatePresence>
        {showForm && <Modal setShow={setShowForm}>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl sm:text-4xl'>Change username</h2>
            <div className='relative'>
              <input
                type='text'
                className='input-tasks w-full'
                placeholder='New username'
                autoComplete='off'
                maxLength='15'
                {...register('username')}
              />
              <AnimatePresence>
                {errors.username && <Popover>{errors.username.message}</Popover>}
              </AnimatePresence>
            </div>
            <button className='btn' type='submit'>
              Change
              {formLoading
                ? <LoadingButton/>
                : <i className='bi bi-pen'/>
              }
            </button>
          </form>
        </Modal>}
      </AnimatePresence>
    </div>
  )
}

export default ChangeUsername
