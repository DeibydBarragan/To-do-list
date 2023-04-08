import React from 'react'
import LoginForm from '../forms/loginForm'
import AuthMethods from './authMethods'
import ResetPassword from '../forms/resetPassword'
import { Link, NavLink } from 'react-router-dom'

/**
 * This component returns the login page
 * @returns returns the login page
 */
const Login = () => {
  return (
    <div className='h-auto grid grid-cols-2 col-span-7'>
      <div className='col-span-2 sm:col-span-1 flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-sm rounded-r-2xl sm:rounded-r-none rounded-l-2xl p-8 gap-6'>
        <h1 className='text-white'>Sign in</h1>
        <AuthMethods/>
        <h4 className='text-white'>Or use your email</h4>
        <LoginForm/>
        <ResetPassword/>
        <Link className='underline decoration-1 sm:hidden' to='/register'>Don&apos;t have an account?</Link>
      </div>
      <div className='hidden sm:grid grid-cols-1 gap-4 content-center rounded-r-2xl p-8 bg-gradient-to-tr from-purple-800 to-orange-500'>
        <h1 className='text-white'>Welcome!</h1>
        <div className='flex flex-col gap-2 mb-20'>
          <h4 className='text-white'>Create your account</h4>
          <NavLink className='btn' to='/register'>
              Register
            <i className='bi bi-person-add text-2xl'/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login
