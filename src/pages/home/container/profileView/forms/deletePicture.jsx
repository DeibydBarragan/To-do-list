import { updateProfile } from 'firebase/auth'
import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { auth } from '../../../../../firebase/firebase'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { NotificationClass } from '../../../../../models/notification.class'
import LoadingButton from './../../../../../components/forms/pure/loadingButton'
import FloatForm from '../container/floatForm'

const DeletePicture = () => {
  const { user, setUser } = useContext(AuthContext)
  const [formLoading, setFormLoading] = useState(false)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)
  // Function to delete picture
  const deletePicture = () => {
    setFormLoading(true)
    updateProfile(auth.currentUser, { photoURL: '' })
      .then(() => {
        console.log('Picture deleted')
        setUser({ ...user, photoURL: null })
        setShowForm(false)
        setNotification(new NotificationClass('Success', 'Picture deleted', 'success'))
      })
      .catch((error) => {
        console.log(error)
        setNotification(new NotificationClass('Error', 'Error deleting picture', 'error'))
      })
      .finally(() => {
        setFormLoading(false)
      })
  }
  return (
    <div className='relative'>
      <button className='btn-settings' onClick={(e) => {
        setShowForm(!showForm)
      }}>
        <i className='bi bi-trash text-2xl'/>
      </button>
      <FloatForm show={showForm} setShow={(setShowForm)}>
        <p className='text-red-600 dark:text-red-600 break-words'>Are you sure you want to delete your picture?</p>
        <div className='flex justify-end gap-2'>
          <button className='btn-settings' onClick={() => setShowForm(false)}>
            <i className='bi bi-x text-2xl'/>
          </button>
          <button className='btn-settings' onClick={deletePicture}>
            {formLoading
              ? <LoadingButton/>
              : <i className='bi bi-check text-2xl'/>
            }
          </button>
        </div>
      </FloatForm>
    </div>
  )
}

export default DeletePicture
