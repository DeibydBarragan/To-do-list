import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthMethods from './container/authMethods'
import RegisterForm from './forms/registerForm'

const Register = () => {
  // Navigate to login
  const navigate = useNavigate()
  // Handle login
  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className='fixed inset-0 content-center background-auth bg-cover grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-6 sm:p-10 md:p-14 lg:p-16 gap-7'>
      <div className='h-auto grid grid-cols-2 col-span-7'>
        <div className='hidden sm:grid grid-cols-1 gap-4 content-center rounded-l-2xl p-8 bg-gradient-to-br from-purple-800 to-orange-500'>
          <h1>Already have an account?</h1>
          <div className='flex flex-col gap-2 mb-20'>
            <button className='btn'
              onClick={handleLogin}
            >
              Sign in
              <i className='bi bi-person-add text-2xl'/>
            </button>
          </div>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-sm rounded-l-2xl sm:rounded-l-none rounded-r-2xl p-8 gap-6'>
          <h1>Register</h1>
          <AuthMethods/>
          <h4>Or use your email</h4>
          <RegisterForm/>
          <a className='underline decoratin-1 sm:hidden' onClick={handleLogin}>Already have an account?</a>
        </div>
      </div>
    </div>
  )
}

export default Register
