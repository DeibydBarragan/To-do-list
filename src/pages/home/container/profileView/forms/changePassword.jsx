import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Modal from '../../../../../components/pure/modal/modal'
import Popover from '../../../../../components/forms/pure/popover'
import { passwordSchema } from './../../../../../components/forms/formSchema/passwordSchema'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { auth } from '../../../../../firebase/firebase'
import { NotificationClass } from '../../../../../models/notification.class'
import TitleForm from '../../../../../components/forms/pure/titleForm'
import SeePassword from '../../../../../components/forms/pure/seePassword'

/**
 * This component returns the change password form
 * @returns returns the change password form
 */
const ChangePassword = () => {
  const { user } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  /**
   * This function manages the change password form
   */
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(passwordSchema)
  })
  /**
   * This function manages the change password form
   * @param {object} data - Data from the form
   */
  const onSubmit = (data) => {
    setFormLoading(true)
    /**
     * Get credential
     */
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    /**
      * Reauthenticate user with given credential
      */
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        /**
         * Update password
         */
        updatePassword(auth.currentUser, data.newPassword)
          .then(() => {
            setShowForm(false)
            reset()
            setNotification(new NotificationClass('Password changed', 'Your password has been changed', 'success'))
          })
          .catch(() => {
            /**
             * Something went wrong
             */
            setError('confirmNewPassword', { message: 'Error changing password' })
          })
      })
      .catch(() => {
        /**
         * Incorrect password
         */
        setError('actualPassword', { message: 'Incorrect password' })
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

  return (
    <div className='flex items-center justify-between pt-4 pb-4'>
      <h4>Password</h4>
      <button className='btn-settings'
        onClick={() => setShowForm(true)}>
        Change
        <i className='bi bi-key text-2xl'/>
      </button>
      <Modal setShow={setShowForm} show={showForm} reset={reset}>
        <form className='form-modal' onSubmit={handleSubmit(onSubmit)}>
          <TitleForm>Change password</TitleForm>
          {/** Actual password */}
          <label>Your actual password</label>
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Actual password'
              maxLength='20'
              id='actualPassword'
              {...register('actualPassword')}
            />
            <SeePassword id='actualPassword'/>
            <Popover show={errors.actualPassword?.message} clear={clearErrors} fieldName='actualPassword'/>
          </div>
          {/** New password */}
          <label>Your new password</label>
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='New password'
              maxLength='20'
              id='newPassword'
              {...register('newPassword')}
            />
            <SeePassword id='newPassword'/>
            <Popover show={errors.newPassword?.message} clear={clearErrors} fieldName='newPassword'/>
          </div>
          {/** Confirm new password */}
          <label>Confirm your new password</label>
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Confirm new password'
              maxLength='20'
              id='confirmNewPassword'
              {...register('confirmNewPassword')}
            />
            <SeePassword id='confirmNewPassword'/>
            <Popover show={errors.confirmNewPassword?.message} clear={clearErrors} fieldName='confirmNewPassword'/>
          </div>
          {/** Button to submit the form */}
          <button className='btn-modal' type='submit'>
                Change
            {formLoading
              ? <LoadingButton/>
              : <i className='bi bi-key'/>
            }
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default ChangePassword
