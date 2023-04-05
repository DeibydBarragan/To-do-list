import { updateProfile } from 'firebase/auth'
import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import { auth, storage } from '../../../../../firebase/firebase'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { NotificationClass } from '../../../../../models/notification.class'
import LoadingButton from './../../../../../components/forms/pure/loadingButton'
import FloatForm from '../container/floatForm'
import { deleteObject, ref } from 'firebase/storage'

/**
 * This component returns the delete picture form
 * @returns returns the delete picture form
 */
const DeletePicture = () => {
  const { user, setUser } = useContext(AuthContext)
  const [formLoading, setFormLoading] = useState(false)
  const { setNotification } = useContext(NotificationContext)
  const [showForm, setShowForm] = useState(false)

  /**
   * This function deletes the user picture
   */
  const deletePicture = async () => {
    setFormLoading(true)
    /**
     * This function updates the user profile
     */
    const updateUserProfile = () => {
      updateProfile(auth.currentUser, { photoURL: '' })
        .then(() => {
          setUser({ ...user, photoURL: null })
          setShowForm(false)
          setNotification(new NotificationClass('Success', 'Picture deleted', 'success'))
        })
        .catch(() => {
          /**
           * something went wrong
           */
          setNotification(new NotificationClass('Error', 'Error deleting picture', 'error'))
        })
    }
    /**
     * Get storage reference
     */
    const storageRef = ref(storage, `userphotos/${user.uid}`)
    /**
     * Delete file
     */
    deleteObject(storageRef)
      .then(() => {
        updateUserProfile()
      })
      .catch((error) => {
        /**
         * If file doesn't exist, only update user profile
         */
        if (error.code === 'storage/object-not-found') {
          updateUserProfile()
          /**
           * Something went wrong
           */
        } else setNotification(new NotificationClass('Error', 'Error deleting picture', 'error'))
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
