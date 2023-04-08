import { React } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthMethods from './authMethods'
import RegisterForm from '../forms/registerForm'

/**
 * This component returns the register page
 * @returns returns the register page
 */
const Register = () => {
  return (
    <div className='h-auto grid grid-cols-2 col-span-7'>
      <div className='hidden sm:grid grid-cols-1 gap-4 content-center rounded-l-2xl p-8 bg-gradient-to-br from-purple-800 to-orange-500'>
        <h1 className='text-white'>Already have an account?</h1>
        <div className='flex flex-col gap-2 mb-20'>
          <NavLink className='btn' to='/login'>
              Sign in
            <i className='bi bi-person-add text-2xl'/>
          </NavLink>
        </div>
      </div>
      <div className='col-span-2 sm:col-span-1 flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-sm rounded-l-2xl sm:rounded-l-none rounded-r-2xl p-8 gap-6'>
        <h1 className='text-white'>Register</h1>
        <AuthMethods/>
        <h4 className='text-white'>Or use your email</h4>
        <RegisterForm/>
        <Link className='underline decoratin-1 sm:hidden' to='/login'>Already have an account?</Link>
      </div>
    </div>
  )
}

export default Register
