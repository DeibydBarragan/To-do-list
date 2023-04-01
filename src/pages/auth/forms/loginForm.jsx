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

const LoginForm = () => {
  const navigate = useNavigate()
  const [formLoading, setFormLoading] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit, setError } = useForm({
    resolver: yupResolver(loginSchema)
  })

  // on submit form
  const onSubmit = async (data) => {
    setFormLoading(true)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate(`/home/${FILTERS.TODAY}`)
    } catch (error) {
      setError('password', { message: 'Email or password incorrect' })
    }
    setFormLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
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
      <div className='relative mt-6'>
        <input
          type='password'
          className='input-auth'
          placeholder='Password'
          maxLength='20'
          {...register('password')}
        />
        {errors.password && <Popover>{errors.password.message}</Popover>}
      </div>
      <button
        className='btn mt-6 w-full'
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
