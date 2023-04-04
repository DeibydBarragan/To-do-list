import React, { useContext, useState } from 'react'
import Modal from '../../../components/pure/modal/modal'
import { useForm } from 'react-hook-form'
import Popover from '../../../components/forms/pure/popover'
import { AnimatePresence } from 'framer-motion'
import LoadingButton from '../../../components/forms/pure/loadingButton'
import { resetEmail } from './../../../components/forms/formSchema/resetPassword'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import { NotificationContext } from '../../../components/context/notificationContext'
import { NotificationClass } from '../../../models/notification.class'

const ResetPassword = () => {
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const { setNotification } = useContext(NotificationContext)
  // Form validation
  const { register, formState: { errors }, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(resetEmail)
  })

  const onSubmit = async (data) => {
    setFormLoading(true)
    try {
      await sendPasswordResetEmail(auth, data.email)
      setShowForm(false)
      setNotification(new NotificationClass('Email sent', 'Check your email to reset your password', 'success'))
    } catch {
      setError('email', { message: 'Error sending email' })
    }
    setFormLoading(false)
  }
  return (
    <div>
      <a className='underline decoration-1 hover:cursor-pointer' onClick={() => {
        setShowForm(true)
        reset()
      }}>
        Forgot your password?
      </a>
      <Modal setShow={setShowForm} show={showForm}>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl sm:text-4xl'>Reset your password</h2>
          <h4>To reset your password you have to write your email</h4>
          {/** New email */}
          <div className='relative'>
            <input
              className='input-tasks w-full'
              placeholder='Email'
              autoComplete='off'
              {...register('email')}
            />
            <AnimatePresence>
              {errors.email && <Popover>{errors.email.message}</Popover>}
            </AnimatePresence>
          </div>
          <button className='btn-modal' type='submit'>
              Reset
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

export default ResetPassword
