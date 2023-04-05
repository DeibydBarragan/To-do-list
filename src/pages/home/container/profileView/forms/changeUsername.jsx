import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import Modal from '../../../../../components/pure/modal/modal'
import { chooseNameSchema } from './../../../../../components/forms/formSchema/chooseNameSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Popover from '../../../../../components/forms/pure/popover'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { updateProfile } from 'firebase/auth'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { auth } from '../../../../../firebase/firebase'
import { NotificationClass } from '../../../../../models/notification.class'

const ChangeUsername = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  /**
   * This function manages the change username form
   */
  const { register, formState: { errors }, handleSubmit, setError, reset, clearErrors } = useForm({
    resolver: yupResolver(chooseNameSchema)
  })
  /**
   * On submit function
   */
  const onSubmit = (data) => {
    setFormLoading(true)
    /**
     * Update user profile
     */
    updateProfile(auth.currentUser, { displayName: data.username })
      .then(() => {
        setUser({ ...user, displayName: data.username })
        setShowForm(false)
        reset()
        setNotification(new NotificationClass('Username changed', 'Your username has been changed', 'success'))
      })
      .catch((e) => {
        console.log(e)
        /**
         * Something went wrong
         */
        setError('username', { message: 'Error changing username' })
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

  return (
    <div className='flex flex-col pt-4 pb-4'>
      <p>Username</p>
      <div className='flex items-center justify-between'>
        <h4>{ user.displayName }</h4>
        <button className='btn-settings' onClick={() => setShowForm(true)}>
          Change
          <i className='bi bi-pencil-square text-2xl'/>
        </button>
      </div>
      <Modal setShow={setShowForm} show={showForm} reset={reset}>
        <form className='form-modal' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl sm:text-4xl'>Change username</h2>
          {/** New username */}
          <div className='relative'>
            <input
              type='text'
              className='input-tasks w-full'
              placeholder='New username'
              autoComplete='off'
              maxLength='15'
              {...register('username')}
            />
            <Popover show={errors.username?.message} clear={clearErrors}/>
          </div>
          <button className='btn-modal' type='submit'>
              Change
            {formLoading
              ? <LoadingButton/>
              : <i className='bi bi-pen'/>
            }
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default ChangeUsername
