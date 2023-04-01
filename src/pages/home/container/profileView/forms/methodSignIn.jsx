import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'

const MethodSignIn = () => {
  const { user } = useContext(AuthContext)
  // This is to get the first letter of the method and capitalize it
  const [method] = useState(user.providerData[0].providerId.split('.')[0].charAt(0).toUpperCase() + user.providerData[0].providerId.split('.')[0].slice(1))
  /// This is to get the icon name
  const [icon] = useState(method === 'google' ? 'google' : method === 'facebook' ? 'facebook' : method === 'github' ? 'github' : 'envelope-at')

  return (
    <div className='flex flex-col pt-4 pb-4'>
      <p className='text-gray-900 dark:text-white'>Services you use to sign in</p>
      <div className='flex items-center gap-5 mt-3'>
        <i className={`bi bi-${icon} text-4xl text-gray-900 dark:text-white`}/>
        {/** This is to get the icon name */}
        <h4 className='text-gray-900 dark:text-white'>{ method === 'Password' ? 'Email and password' : method }</h4>
      </div>
    </div>
  )
}

export default MethodSignIn
