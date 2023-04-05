import React, { createContext, useContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { NotificationContext } from './notificationContext'
import { NotificationClass } from '../../models/notification.class'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [methods, setMethods] = useState([])
  const { setNotification } = useContext(NotificationContext)

  useEffect(() => {
    if (user) {
      setMethods(user.providerData.map((method) => method.providerId.split('.')[0].charAt(0).toUpperCase() + method.providerId.split('.')[0].slice(1)))
      // If user is logged with facebook, set the user photo to null
      // Because facebook doesn't allow to get the user photo
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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        if (currentUser.emailVerified) {
          console.log('Email not verified')
          setNotification(new NotificationClass('Verify your email', 'Please verify your email', 'error'))
        }
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
