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

const ChangePassword = () => {
  const { user } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  const onSubmit = (data) => {
    setFormLoading(true)
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        updatePassword(auth.currentUser, data.newPassword)
          .then(() => {
            setShowForm(false)
            reset()
            setNotification(new NotificationClass('Password changed', 'Your password has been changed', 'success'))
          })
          .catch(() => {
            setError('confirmNewPassword', { message: 'Error changing password' })
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
      <h4>Password</h4>
      <button className='btn-settings'
        onClick={() => setShowForm(true)}>
        Change
        <i className='bi bi-key text-2xl'/>
      </button>
      <Modal setShow={setShowForm} show={showForm} reset={reset}>
        <form className='form-modal' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl sm:text-4xl'>Change password</h2>
          {/** Actual password */}
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Actual password'
              maxLength='20'
              {...register('actualPassword')}
            />
            <Popover show={errors.actualPassword?.message} clear={clearErrors} fieldName='actualPassword'/>
          </div>
          {/** New password */}
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='New password'
              maxLength='20'
              {...register('newPassword')}
            />
            <Popover show={errors.newPassword?.message} clear={clearErrors} fieldName='newPassword'/>
          </div>
          {/** Confirm new password */}
          <div className='relative'>
            <input
              type='password'
              className='input-tasks w-full'
              placeholder='Confirm new password'
              maxLength='20'
              {...register('confirmNewPassword')}
            />
            <Popover show={errors.confirmNewPassword?.message} clear={clearErrors} fieldName='confirmNewPassword'/>
          </div>
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
