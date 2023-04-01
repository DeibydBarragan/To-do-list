import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoginForm from './forms/loginForm'
import AuthMethods from './container/authMethods'

const Login = () => {
  const navigate = useNavigate()

  // Handle register
  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className='fixed inset-0 content-center background-auth bg-cover grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-6 sm:p-10 md:p-14 lg:p-16 gap-7'>
      <motion.div className='h-auto grid grid-cols-2 col-span-7'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <div className='col-span-2 sm:col-span-1 flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-sm rounded-r-2xl sm:rounded-r-none rounded-l-2xl p-8 gap-6'>
          <h1>Sign in</h1>
          <AuthMethods/>
          <h4>Or use your email</h4>
          <LoginForm/>
          <a className='underline decoration-1'>Forgot your password?</a>
          <a className='underline decoration-1 sm:hidden' onClick={handleRegister}>Don&apos;t have an account?</a>
        </div>
        <div className='hidden sm:grid grid-cols-1 gap-4 content-center rounded-r-2xl p-8 bg-gradient-to-tr from-purple-800 to-orange-500'>
          <h1>Welcome!</h1>
          <div className='flex flex-col gap-2 mb-20'>
            <h4>Create your account</h4>
            <button className='btn' onClick={handleRegister}>
              Register
              <i className='bi bi-person-add text-2xl'/>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
