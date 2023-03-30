import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { registerSchema } from './../../../components/forms/formSchema/registerSchema'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'
import { FILTERS } from './../../../models/filters.enum'
import { useForm } from 'react-hook-form'
import Popover from '../../../components/forms/pure/popover'

const RegisterForm = () => {
  const navigate = useNavigate()
  // Form validation
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      navigate(`home/${FILTERS.TODAY}`)
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      {/** Email input */}
      <div className='relative'>
        <input
          type='text'
          className='input-auth'
          placeholder='Email'
          autoComplete='off'
          {...register('email')}
        />
        {errors.email && <Popover>{errors.email.message}</Popover>}
      </div>
      {/** Password input */}
      <div className='relative mt-6'>
        <input
          type='password'
          className='input-auth'
          placeholder='Password'
          {...register('password')}
        />
        {errors.password && <Popover>{errors.password.message}</Popover>}
      </div>
      {/** Confirm password input */}
      <div className='relative mt-6'>
        <input
          type='password'
          className='input-auth'
          placeholder='Confirm password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <Popover>{errors.confirmPassword.message}</Popover>}
      </div>
      <button className='btn w-full mt-6'>
        Register
        <i className='bi bi-box-arrow-right ml-2 text-2xl'/>
      </button>
    </form>
  )
}

export default RegisterForm
