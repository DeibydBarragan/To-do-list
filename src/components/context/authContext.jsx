import React, { createContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userPhoto, setUserPhoto] = useState(null)

  useEffect(() => {
    // If user is logged with facebook, set the user photo to null
    if (user?.providerData[0].providerId === 'facebook.com') {
      setUserPhoto(null)
    } else {
      setUserPhoto(user?.providerData[0].photoURL)
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
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
        userPhoto
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
