import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'

const MethodSignIn = () => {
  const { methods } = useContext(AuthContext)
  const [icons, setIcons] = useState([])
  /// This is to get the icon name
  useEffect(() => {
    setIcons(methods.map((method) => method === 'Google' ? 'google' : method === 'Facebook' ? 'facebook' : method === 'Github' ? 'github' : 'envelope-at'))
  }, [methods])
  return (
    <div className='flex flex-col pt-4 pb-4'>
      <p>Services you use to sign in</p>
      <div className='flex items-center gap-5 mt-3'>
        {icons.map((icon, index) => <i className={`bi bi-${icon} text-4xl text-gray-900 dark:text-white`} key={ index }/>)}
      </div>
    </div>
  )
}

export default MethodSignIn
