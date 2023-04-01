import { AnimatePresence } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Modal from '../../../../../components/pure/modal/modal'
import Popover from '../../../../../components/forms/pure/popover'
import { confirmPasswordSchema } from '../../../../../components/forms/formSchema/confirmPasswordSchema'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth'

const DeleteUser = () => {
  const { user } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(confirmPasswordSchema)
  })

  const onSubmit = (data) => {
    setFormLoading(true)
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    reauthenticateWithCredential(user, credential)
      .then(() => {
        deleteUser(user)
          .then(() => {
            setShowForm(false)
          })
          .catch(() => {
            setError('actualPassword', { message: 'Error deleting your account' })
          })
      })
      .catch(() => {
        setError('actualPassword', { message: 'Incorrect password' })
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

  return (
    <div className='flex items-center justify-between pt-4 pb-4'>
      <h4 className='text-gray-900 dark:text-white'>Delete account</h4>
      <button className='btn-settings'
        onClick={() => {
          setShowForm(true)
          reset()
        }}>
        Delete
        <i className='bi bi-trash text-2xl'/>
      </button>
      <AnimatePresence>
        {showForm && (<Modal setShow={setShowForm}>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl sm:text-4xl'>Delete account</h2>
            <h4>To delete your account you have to write your password</h4>
            {/** Actual password */}
            <div className='relative'>
              <input
                type='password'
                className='input-tasks w-full'
                placeholder='Your password'
                maxLength='20'
                {...register('actualPassword')}
              />
              <AnimatePresence>
                {errors.actualPassword && <Popover>{errors.actualPassword.message}</Popover>}
              </AnimatePresence>
            </div>
            <button className='btn bg-red-700 outline-none hover:bg-red-800 hover:text-white' type='submit'>
                Delete
              {formLoading
                ? <LoadingButton/>
                : <i className='bi bi-trash'/>
              }
            </button>
          </form>
        </Modal>)}

      </AnimatePresence>
    </div>
  )
}

export default DeleteUser
