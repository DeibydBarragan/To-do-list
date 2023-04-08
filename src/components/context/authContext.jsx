import React, { createContext, useContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { NotificationContext } from './notificationContext'
import { NotificationClass } from '../../models/notification.class'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  /**
   * State for current user
   */
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  /**
   * Methods is an array with the methods that the user used to login
   */
  const [methods, setMethods] = useState([])
  const { setNotification } = useContext(NotificationContext)

  useEffect(() => {
    if (user) {
      /**
       * Set the methods array with the methods that the user used to login
       */
      setMethods(user.providerData.map((method) => method.providerId.split('.')[0].charAt(0).toUpperCase() + method.providerId.split('.')[0].slice(1)))
      /**
       * If user is logged with facebook, set the user photo to null
       * Because facebook doesn't allow to get the user photo
       */
      if (user.photoURL !== null && user.providerData[0].providerId === 'facebook.com') {
        updateProfile(auth.currentUser, {
          photoURL: ''
        })
          .then(() => {
            setUser({ ...user, photoURL: null })
          })
      }
    }
  }, [user])

  /**
   * Check if the user is verified
   */
  useEffect(() => {
    /**
     * Check if the user is logged
     */
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        /**
         * If the user is logged and the email is not verified
         */
        const methods = currentUser.providerData.map((method) => method.providerId.split('.')[0])
        if (!currentUser.emailVerified && (!methods.includes('google') || !methods.includes('facebook') || !methods.includes('github'))) {
          setNotification(new NotificationClass('Verify your email', 'Please verify your email', 'error'))
        }
        setUser(currentUser)
        /**
         * If the user is not logged
         */
      } else {
        setUser(null)
        setMethods([])
        setNotification(null)
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        methods,
        setMethods
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: propTypes.node
}
export { AuthContext, AuthContextProvider }
