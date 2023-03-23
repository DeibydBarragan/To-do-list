import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const handleRegister = () => {
    navigate('/register')
  }
  return (
        <div className='fixed inset-0 content-center background-auth bg-cover grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-6 sm:p-10 md:p-14 lg:p-16 gap-7'>
            <div className='h-auto grid grid-cols-2 col-span-7'>
              <div className='col-span-2 sm:col-span-1 flex flex-col justify-center bg-black bg-opacity-30 backdrop-blur-sm rounded-r-2xl sm:rounded-r-none rounded-l-2xl p-8 gap-6 content-center'>
                <h1>Sign in</h1>
                <div className='flex gap-5'>
                  <Link>
                    <i className="text-4xl bi bi-google"/>
                  </Link>
                  <Link>
                    <i className="text-4xl bi bi-facebook"/>
                  </Link>
                  <Link>
                    <i className="text-4xl bi bi-github"/>
                  </Link>
                </div>
                <h4>Or use your email</h4>
                <input type='text' className='input-auth' placeholder='Email'></input>
                <input type='password' className='input-auth' placeholder='Password'></input>
                <button className='btn'>
                  Login
                  <i className='bi bi-box-arrow-right ml-2 text-2xl'/>
                </button>
                <button className='btn sm:hidden'>
                  Register
                  <i className='bi bi-person-add ml-2 text-2xl'/>
                </button>
                <a className='underline decoration-1'>Forgot your password?</a>
              </div>
              <div className='hidden sm:grid grid-cols-1 gap-4 content-center rounded-r-2xl p-8 bg-gradient-to-tr from-purple-800 to-orange-500'>
                <h1>Welcome!</h1>
                <div className='flex flex-col gap-2 mb-20'>
                  <h4>Create your account</h4>
                  <button className='btn' onClick={handleRegister}>
                    Register
                    <i className='bi bi-person-add ml-2 text-2xl'/>
                  </button>
                </div>
              </div>
            </div>
        </div>
  )
}

export default Login
