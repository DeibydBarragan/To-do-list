import { React, useState } from 'react'
import Popover from '../../../components/forms/pure/popover'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../components/forms/formSchema/loginSchema'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../../models/filters.enum'
import LoadingButton from '../../../components/forms/pure/loadingButton'

/**
 * This component returns the login form
 * @returns returns the login form
 */
const LoginForm = () => {
  const navigate = useNavigate()
  const [formLoading, setFormLoading] = useState(false)
  /**
   * This function manages the login form
   */
  const { register, formState: { errors }, handleSubmit, setError, clearErrors } = useForm({
    resolver: yupResolver(loginSchema)
  })

  /**
   * This function handles the login form submit
   */
  const onSubmit = async (data) => {
    setFormLoading(true)
    try {
      /**
       * Sign in with email and password
       */
      await signInWithEmailAndPassword(auth, data.email, data.password)
      /**
       * Navigate to home page
       */
      navigate(`/home/${FILTERS.TODAY}`)
    } catch (error) {
      console.log(error)
      /**
       * Wrong password
       */
      if (error.code === 'auth/wrong-password') setError('password', { message: 'Incorrect password' })
      /**
       * User not found
       */
      else if (error.code === 'auth/user-not-found') setError('email', { message: 'User not found' })
      /**
       * Something went wrong
       */
      else setError('email', { message: 'Something went wrong' })
    }
    setFormLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
      <div className='relative'>
        <input
          type='text'
          className='input-auth'
          placeholder='Email'
          autoComplete='off'
          {...register('email')}
        />
        <Popover show={errors.email?.message} clear={clearErrors} fieldName='email'/>
      </div>
      <div className='relative'>
        <input
          type='password'
          className='input-auth'
          placeholder='Password'
          maxLength='20'
          {...register('password')}
        />
        <Popover show={errors.password?.message} clear={clearErrors} fieldName='password'/>
      </div>
      <button
        className='btn w-full'
        type='submit'
        {...(formLoading && { disabled: true })} // disable button if form is loading
      >
        Login
        {formLoading
          ? <LoadingButton/>
          : <i className='bi bi-box-arrow-right text-2xl'/>
        }
      </button>
    </form>
  )
}

export default LoginForm
