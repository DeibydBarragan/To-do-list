import { React, useContext } from 'react'
import { auth, facebookProvider, googleProvider, githubProvider } from '../../../firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../../models/filters.enum'
import { NotificationContext } from '../../../components/context/notificationContext'
import { NotificationClass } from '../../../models/notification.class'

/**
 * This component returns the auth methods
 * @returns returns the auth methods
 */
const AuthMethods = () => {
  const { setNotification } = useContext(NotificationContext)
  const navigate = useNavigate()
  /**
   * This function signs in with the provider
   */
  const signInWithMethod = (provider) => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate(`/Tasklist/home/${FILTERS.TODAY}`)
      })
      .catch((error) => {
        /**
         * If the user already has an account with this email, try with another method
         */
        if (error.code === 'auth/account-exists-with-different-credential') {
          setNotification(new NotificationClass('Error', 'You already have an account with this email, try with another method', 'error'))
        /**
         * If the user closes the popup, do nothing
         */
        } else if (error.code !== 'auth/popup-closed-by-user') {
          setNotification(new NotificationClass('Error', 'Error signing in with this method', 'error'))
        }
      })
  }
  return (
    <div>
      <div className='flex gap-5'>
        {/** Google button */}
        <button onClick={() => signInWithMethod(googleProvider)}>
          <i className="text-4xl bi bi-google"/>
        </button>
        {/** Facebook button */}
        <button onClick={() => signInWithMethod(facebookProvider)}>
          <i className="text-4xl bi bi-facebook"/>
        </button>
        {/** Github button */}
        <button onClick={() => signInWithMethod(githubProvider)}>
          <i className="text-4xl bi bi-github"/>
        </button>
      </div>
    </div>
  )
}

export default AuthMethods
