import React, { createContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [methods, setMethods] = useState([])

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
      } else {
        setUser(null)
        setMethods([])
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
