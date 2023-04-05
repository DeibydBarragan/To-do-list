import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import Popover from '../../../../../components/forms/pure/popover'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../../../../../firebase/firebase'
import LoadingButton from '../../../../../components/forms/pure/loadingButton'
import { NotificationContext } from '../../../../../components/context/notificationContext'
import { updateProfile } from 'firebase/auth'
import { NotificationClass } from '../../../../../models/notification.class'

const ChangePicture = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [error, setError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const onSubmit = async (e) => {
    setError(null)
    const file = e.target.files[0]
    // Check if file is an image
    if (file && file.type.startsWith('image/')) {
      if (file && file.size < 1000000) {
        setFormLoading(true)
        // Upload file to firebase storage
        const storageRef = ref(storage, `userphotos/${user.uid}`)
        // Upload file
        try {
          await uploadBytes(storageRef, file)
          setNotification(new NotificationClass('Photo updated', 'Your photo have been uploaded', 'success'))
        } catch (error) {
          console.log(error)
          setError('Error uploading file')
        }
        // Get download url and update profile
        try {
          // Get download url
          const downloadURL = await getDownloadURL(storageRef)
          // Update user profile
          await updateProfile(auth.currentUser, { photoURL: downloadURL })
          setUser({ ...user, photoURL: downloadURL })
        } catch (error) {
          setError('Error updating profile')
        }
        setFormLoading(false)
      } else {
        setError('File size must be less than 1MB')
      }
    } else {
      setError('Only image files are allowed')
    }
  }

  return (
    <form className='w-full relative'>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        id='uploadPhoto'
        onChange={onSubmit}
      />
      <label htmlFor='uploadPhoto' className='btn-settings cursor-pointer'>
        { user.photoURL
          ? 'Change photo'
          : 'Add photo'
        }
        { formLoading
          ? <LoadingButton/>
          : <i className='bi bi-images text-2xl'/>
        }
      </label>
      <Popover setShow={setError} show={error}/>
    </form>
  )
}

export default ChangePicture
