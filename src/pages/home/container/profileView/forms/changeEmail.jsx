import { AnimatePresence } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Modal from '../../../../../components/pure/modal/modal'
import Popover from '../../../../../components/forms/pure/popover'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { EmailAuthProvider, fetchSignInMethodsForEmail, reauthenticateWithCredential, updateEmail } from 'firebase/auth'
import { auth } from '../../../../../firebase/firebase'
import { changeEmailSchema } from '../../../../../components/forms/formSchema/changeEmailSchema'

const ChangeEmail = () => {
  const { user, setUser } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(changeEmailSchema)
  })

  const onSubmit = (data) => {
    setFormLoading(true)
    // Get credential
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    // Reauthenticate
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // Check if email is already in use
        fetchSignInMethodsForEmail(auth, data.newEmail).then((methods) => {
          if (methods.length === 0) {
            // Update email
            updateEmail(user, data.newEmail)
              .then(() => {
                setUser({ ...user, email: data.newEmail })
                setShowForm(false)
              })
              .catch(() => {
                setError('newEmail', { message: 'Error changing email' })
              })
          } else {
            setError('newEmail', { message: 'Email already in use' })
          }
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
    <div className='flex flex-col pt-4 pb-4'>
      <p className='text-gray-900 dark:text-white' >Email</p>
      <div className='flex items-center justify-between'>
        <h4 className='text-gray-900 dark:text-white text-sm md:text-xl'>{ user.email }</h4>
        <button className='btn-settings' onClick={() => {
          setShowForm(true)
          reset()
        }}>
          Change
          <i className='bi bi-envelope text-2xl'/>
        </button>
      </div>
      <AnimatePresence>
        {showForm && (<Modal setShow={setShowForm}>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl sm:text-4xl'>Change email</h2>
            <h4>To change your email yo have to write your password</h4>
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
            {/** New email */}
            <div className='relative'>
              <input
                className='input-tasks w-full'
                placeholder='New email'
                {...register('newEmail')}
              />
              <AnimatePresence>
                {errors.newEmail && <Popover>{errors.newEmail.message}</Popover>}
              </AnimatePresence>
            </div>
            <button className='btn' type='submit'>
                Change
              {formLoading
                ? <LoadingButton/>
                : <i className='bi bi-envelope'/>
              }
            </button>
          </form>
        </Modal>)}

      </AnimatePresence>
    </div>
  )
}

export default ChangeEmail
