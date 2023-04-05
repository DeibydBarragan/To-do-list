import React, { useState, useContext } from 'react'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { fetchSignInMethodsForEmail, updateEmail, updatePassword } from 'firebase/auth'
import { auth } from '../../../../../firebase/firebase'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { NotificationClass } from '../../../../../models/notification.class'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from '../../../../../components/pure/modal/modal'
import Popover from '../../../../../components/forms/pure/popover'
import { AuthContext } from '../../../../../components/context/authContext'
import { registerSchema } from './../../../../../components/forms/formSchema/registerSchema'

const SetPassword = () => {
  const { user, setUser, setMethods, methods } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [formLoading, setFormLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = (data) => {
    setFormLoading(true)
    // Check if email is already in use
    if (user.email !== data.email) {
      fetchSignInMethodsForEmail(auth, data.email)
        .then((res) => {
          if (res.length > 0) {
            setError('email', { message: 'Email already in use' })
          } else {
            // Add email and password
            // Update email
            updateEmail(auth.currentUser, data.email)
              .then(() => {
                // Update password
                updatePassword(auth.currentUser, data.password)
                  .then(() => {
                    // Update states
                    setMethods([...methods, 'password'])
                    setUser({ ...user, email: data.email, emailVerified: false, password: data.password })
                    // Send a successful notification
                    setNotification(new NotificationClass('Email and password added', 'Your email and password have been added', 'success'))
                    setShowForm(false)
                    reset()
                  })
                  .catch((e) => {
                    console.log(e)
                    setError('password', { message: 'Error adding password' })
                  })
              })
              .catch((e) => {
                console.log(e)
                if (e.code === 'auth/requires-recent-login') setError('email', { message: 'For security you need to reauthenticate to set password and email' })
                else setError('email', { message: 'Error adding email' })
              })
          }
        })
        .catch((e) => {
          console.log(e)
          setError('email', { message: 'Error verifying email' })
        })
        .finally(() => {
          setFormLoading(false)
        })
    } else {
      // Add password
      updatePassword(auth.currentUser, data.password)
        .then(() => {
          // Update states
          setMethods([...methods, 'password'])
          setUser({ ...user, password: data.password })
          // Send a successful notification
          setNotification(new NotificationClass('Password added', 'Your password has been added', 'success'))
          setShowForm(false)
        })
        .catch((e) => {
          console.log(e)
          // Check if user needs to reauthenticate
          if (e.code === 'auth/requires-recent-login') setError('password', { message: 'You need to reauthenticate to add a password' })
          else setError('password', { message: 'Error adding password' })
        })
        .finally(() => {
          setFormLoading(false)
        })
    }
  }

  return (
    <div className='flex items-center justify-between pt-4 pb-4'>
      <h4>Set email and password</h4>
      <button className='btn-settings'
        onClick={() => setShowForm(true)}>
        Add
        <i className='bi bi-envelope text-2xl'/>
      </button>
      <Modal setShow={setShowForm} show={showForm} reset={reset}>
        <form className='form-modal' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-2xl sm:text-3xl'>Set your email and password</h2>
          {/** email */}
          <div className='relative'>
            <input
              className='input-tasks w-full'
              placeholder= 'Email'
              defaultValue={ user.email }
              autoComplete='off'
              {...register('email')}
            />
            <Popover show={errors.email?.message} clear={clearErrors} fieldName='email'/>
          </div>
          {/** password */}
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Password'
              maxLength='20'
              {...register('password')}
            />
            <Popover show={errors.password?.message} clear={clearErrors} fieldName='password'/>
          </div>
          {/** Confirm password */}
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Confirm your password'
              maxLength='20'
              {...register('confirmPassword')}
            />
            <Popover show={errors.confirmPassword?.message} clear={clearErrors} fieldName='cofirmPassword'/>
          </div>
          <button className='btn-modal' type='submit'>
            Set password
            {formLoading
              ? <LoadingButton/>
              : <i className='bi bi-key text-2xl'/>
            }
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default SetPassword
