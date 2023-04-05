import { yupResolver } from '@hookform/resolvers/yup'
import { React, useState } from 'react'
import { registerSchema } from './../../../components/forms/formSchema/registerSchema'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'
import { FILTERS } from './../../../models/filters.enum'
import { useForm } from 'react-hook-form'
import Popover from '../../../components/forms/pure/popover'
import LoadingButton from '../../../components/forms/pure/loadingButton'

const RegisterForm = () => {
  const [formLoading, setFormLoading] = useState(false)
  const navigate = useNavigate()
  // Form validation
  const { register, formState: { errors }, handleSubmit, setError, clearErrors } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    setFormLoading(true)
    try {
      const methods = await fetchSignInMethodsForEmail(auth, data.email)
      if (methods.length > 0) {
        setError('email', { message: 'Email already in use' })
        return setFormLoading(false)
      }
    } catch (error) {
      setError('email', { message: 'Error verifying email' })
      return setFormLoading(false)
    }
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      navigate(`/home/${FILTERS.TODAY}`)
    } catch (error) {
      setError('confirmPassword', { message: 'Failed to register' })
    }
    setFormLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
      {/** Email input */}
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
      {/** Password input */}
      <div className='relative'>
        <input
          type='password'
          className='input-auth'
          placeholder='Password'
          {...register('password')}
        />
        <Popover show={errors.password?.message} clear={clearErrors} fieldName='password'/>
      </div>
      {/** Confirm password input */}
      <div className='relative'>
        <input
          type='password'
          className='input-auth'
          placeholder='Confirm password'
          maxLength='20'
          {...register('confirmPassword')}
        />
        <Popover show={errors.confirmPassword?.message} clear={clearErrors} fieldName='confirmPassword'/>
      </div>
      <button
        className='btn w-full'
        type='submit'
        {...(formLoading && { disabled: true })} // disable button if form is loading
      >
        Register
        {formLoading
          ? <LoadingButton/>
          : <i className='bi bi-box-arrow-right ml-2 text-2xl'/>
        }
      </button>
    </form>
  )
}

export default RegisterForm
