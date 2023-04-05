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
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { NotificationClass } from '../../../../../models/notification.class'

const ChangeEmail = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(changeEmailSchema)
  })

  const onSubmit = (data) => {
    setFormLoading(true)
    // Get credential
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    // Reauthenticate
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // Check if email is already in use
        fetchSignInMethodsForEmail(auth, data.newEmail).then((methods) => {
          if (methods.length === 0) {
            // Update email
            updateEmail(auth.currentUser, data.newEmail)
              .then(() => {
                setUser({ ...user, email: data.newEmail })
                setShowForm(false)
                reset()
                setNotification(new NotificationClass('Email changed', 'Your email has been changed', 'success'))
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
      <p>Email</p>
      <div className='flex items-center justify-between'>
        <h4 className='text-gray-900 dark:text-white text-sm md:text-xl'>{ user.email }</h4>
        <button className='btn-settings' onClick={() => setShowForm(true)}>
          Change
          <i className='bi bi-envelope text-2xl'/>
        </button>
      </div>
      <Modal setShow={setShowForm} show={showForm} reset={reset}>
        <form className='form-modal' onSubmit={handleSubmit(onSubmit)}>
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
            <Popover show={errors.actualPassword?.message} clear={clearErrors} fieldName='actualPassword'/>
          </div>
          {/** New email */}
          <div className='relative'>
            <input
              className='input-tasks w-full'
              autoComplete='off'
              placeholder='New email'
              {...register('newEmail')}
            />
            <Popover show={errors.newEmail?.message} clear={clearErrors} fieldName='newEmail'/>
          </div>
          <button className='btn-modal' type='submit'>
                Change
            {formLoading
              ? <LoadingButton/>
              : <i className='bi bi-envelope'/>
            }
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default ChangeEmail
