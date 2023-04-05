import React, { useContext, useState } from 'react'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../../../../firebase/firebase'
import { NotificationClass } from '../../../../../models/notification.class'

const VerifyEmail = () => {
  const { setNotification } = useContext(NotificationContext)
  const [formLoading, setFormLoading] = useState(false)

  const handleVerifyEmail = async () => {
    setFormLoading(true)
    try {
      await sendEmailVerification(auth.currentUser)
      setNotification(new NotificationClass('Email sent', 'We have sent you an email to verify your account', 'success'))
    } catch (e) {
      console.error(e)
      if (e.code === 'auth/too-many-requests') setNotification(new NotificationClass('Error', 'Too many requests, try again later', 'error'))
      else setNotification(new NotificationClass('Error', 'Error sending email', 'error'))
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-between pt-4 pb-4'>
      <h4>Verify email</h4>
      <div className='relative'>
        <button
          className='btn-settings'
          onClick={handleVerifyEmail}
        >
          Send verification
          {formLoading
            ? <LoadingButton/>
            : <i className='bi bi-send-check text-2xl'/>}
        </button>
      </div>
    </div>
  )
}

export default VerifyEmail
