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
import TitleForm from '../../../../../components/forms/pure/titleForm'
import SeePassword from '../../../../../components/forms/pure/seePassword'

/**
 * This component returns the set password form
 * @returns returns the set password form
 */
const SetPassword = () => {
  const { user, setUser, setMethods, methods } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [formLoading, setFormLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  /**
   * This function manages the set password form
   */
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(registerSchema)
  })
  /**
   * When the form is submitted withouth errors
   * @param {object} data - The data from the form
   */
  const onSubmit = (data) => {
    setFormLoading(true)
    /**
     * Check if the form email is different from the current one
     */
    if (user.email !== data.email) {
      /**
       * Check if the email is already in use
       */
      fetchSignInMethodsForEmail(auth, data.email)
        .then((res) => {
          if (res.length > 0) {
            // Email already in use
            setError('email', { message: 'Email already in use' })
          } else {
            /**
             * Add email, password and update states
             */
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
                  .catch(() => {
                    /**
                     * Something went wrong
                     */
                    setError('password', { message: 'Error adding password' })
                  })
              })
              .catch((e) => {
                /**
                 * If the user needs to reauthenticate
                 */
                if (e.code === 'auth/requires-recent-login') setError('email', { message: 'For security you need to reauthenticate to set password and email' })
                /**
                 * Something went wrong
                 */
                else setError('email', { message: 'Error adding email' })
              })
          }
        })
        .catch((e) => {
          /**
           * Something went wrong
           */
          setError('email', { message: 'Error verifying email' })
        })
        .finally(() => {
          setFormLoading(false)
        })
    /**
     * If the email is the same as the current one
     */
    } else {
      /**
       * Only add password
       * Update password and update states
       */
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
          /**
           * If the user needs to reauthenticate
           */
          if (e.code === 'auth/requires-recent-login') setError('password', { message: 'You need to reauthenticate to add a password' })
          /**
           * Something went wrong
           */
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
          <TitleForm>Set your email and password</TitleForm>
          {/** email */}
          <label>Your email</label>
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
          <label>Your password</label>
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Password'
              id='password'
              maxLength='20'
              {...register('password')}
            />
            <SeePassword id='password'/>
            <Popover show={errors.password?.message} clear={clearErrors} fieldName='password'/>
          </div>
          {/** Confirm password */}
          <label>Confirm your password</label>
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Confirm your password'
              maxLength='20'
              id='confirmPassword'
              {...register('confirmPassword')}
            />
            <SeePassword id='confirmPassword'/>
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
