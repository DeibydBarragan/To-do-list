import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Modal from '../../../../../components/pure/modal/modal'
import Popover from '../../../../../components/forms/pure/popover'
import { confirmPasswordSchema } from '../../../../../components/forms/formSchema/confirmPasswordSchema'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { auth } from '../../../../../firebase/firebase'
import { NotificationClass } from '../../../../../models/notification.class'
import FloatForm from '../container/floatForm'

/**
 * This component returns the delete user form
 * @returns returns the delete user form
 */
const DeleteUser = () => {
  const { user, methods } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  /**
   * This function manages the delete user form
   */
  const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(confirmPasswordSchema)
  })
  /**
   * When the form is submitted withouth errors
   * @param {object} data - The data from the form
   */
  const onSubmit = (data) => {
    setFormLoading(true)
    /**
     * Get the user credential
     */
    const credential = EmailAuthProvider.credential(user.email, data.actualPassword)
    /**
     * Reauthenticate the user
     */
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        /**
         * Delete the user
         */
        deleteUser(auth.currentUser)
          .then(() => {
            setShowForm(false)
            reset()
            // Send a successful notification
            setNotification(new NotificationClass('Account deleted', 'Your account has been deleted', 'success'))
          })
          .catch(() => {
            setError('actualPassword', { message: 'Error deleting your account' })
          })
      })
      .catch((e) => {
        /**
         * If the password is wrong
         */
        if (e.code === 'auth/wrong-password') setError('actualPassword', { message: 'Incorrect password' })
        /**
         * Something went wrong
         */
        else setError('actualPassword', { message: 'Error deleting your account' })
      })
      .finally(() => {
        setFormLoading(false)
      })
  }
  /**
   * This function deletes the user without password
   */
  const handleDeleteUser = () => {
    setFormLoading(true)
    /**
     * Delete the user
     */
    deleteUser(auth.currentUser)
      .then(() => {
        setShowForm(false)
        // Send a successful notification
        setNotification(new NotificationClass('Account deleted', 'Your account has been deleted', 'success'))
      })
      .catch((e) => {
        /**
         * If the user has to reauthenticate
         */
        if (e.code === 'auth/requires-recent-login') setNotification(new NotificationClass('Error', 'For security you have to reauthenticate before deleting your account', 'error'))
        /**
         * Something went wrong
         */
        else setNotification(new NotificationClass('Error', 'Error deleting your account', 'error'))
      })
      .finally(() => {
        setFormLoading(false)
        setShowForm(false)
      })
  }

  return (
    <div className='flex items-center justify-between pt-4 pb-4'>
      <h4>Delete account</h4>
      <div className='relative'>
        <button className='btn-settings'
          onClick={(e) => {
            setShowForm(!showForm)
            e.stopPropagation()
            reset()
          }}>
          Delete
          <i className='bi bi-trash text-2xl'/>
        </button>
        {/** Form to delete account
         * If the user has a password, it will ask for the password
        */}
        {methods.includes('Password')
          ? <Modal setShow={setShowForm} show={showForm} reset={reset}>
            <form className='flex flex-col gap-4 p-4' onSubmit={handleSubmit(onSubmit)}>
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
                <Popover show={errors.actualPassword?.message} clear={clearErrors} fieldName='actualPassword'/>
              </div>
              <button className='btn bg-red-700 outline-none hover:bg-red-800 text-white hover:text-white' type='submit'>
                  Delete
                {formLoading
                  ? <LoadingButton/>
                  : <i className='bi bi-trash'/>
                }
              </button>
            </form>
          </Modal>
          : <FloatForm show={showForm} setShow={setShowForm}>
            {/** If the user has no password, it will delete the account without asking for the password */}
            <p className='text-red-600 dark:text-red-600 break-words'>Are you sure you want to delete your account?</p>
            <div className='flex justify-end gap-2'>
              <button className='btn-settings' onClick={() => setShowForm(false)}>
                <i className='bi bi-x text-2xl'/>
              </button>
              <button className='btn-settings' onClick={handleDeleteUser}>
                {formLoading
                  ? <LoadingButton/>
                  : <i className='bi bi-check text-2xl'/>
                }
              </button>
            </div>
          </FloatForm>
        }
      </div>

    </div>
  )
}

export default DeleteUser
