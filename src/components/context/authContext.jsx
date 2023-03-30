import React, { createContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)

  useEffect(() => {
    const hasUsername = async () => {
      // Get the username from the database
      const querySnapshot = await getDocs(collection(db, 'usernames'))
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === user?.uid) {
          setUserName(doc.data().username)
        }
      })
      // If user is logged with facebook, set the user photo to null
      if (user?.providerData[0].providerId === 'facebook.com') {
        setUserPhoto(null)
      } else {
        setUserPhoto(user?.providerData[0].photoURL)
      }
      setLoading(false)
    }
    hasUsername()
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        userName,
        setUserName,
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
