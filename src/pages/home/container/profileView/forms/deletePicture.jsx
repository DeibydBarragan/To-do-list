import { updateProfile } from 'firebase/auth'
import { React, useContext } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'

const DeletePicture = () => {
  const { user, setUser } = useContext(AuthContext)
  const deletePicture = async () => {
    try {
      await updateProfile(user, { photoURL: null })
      setUser({ ...user, photoURL: null })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button className='btn-settings' onClick={deletePicture}>
      <i className='bi bi-trash3 text-2xl'/>
    </button>
  )
}

export default DeletePicture
