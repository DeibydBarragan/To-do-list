import React, { useContext } from 'react'
import { auth, facebookProvider, googleProvider, githubProvider } from '../../../firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../../models/filters.enum'
import { AuthContext } from '../../../components/context/authContext'

const AuthMethods = () => {
  const { setLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  // Sign in with google, facebook or github
  const signInWithMethod = async (provider) => {
    await signInWithPopup(auth, provider)
    navigate(`/home/${FILTERS.TODAY}`)
    setLoading(true)
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
