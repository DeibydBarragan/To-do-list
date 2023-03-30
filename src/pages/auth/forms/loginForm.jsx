import { React, useContext } from 'react'
import Popover from '../../../components/forms/pure/popover'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import { AuthContext } from '../../../components/context/authContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../components/forms/formSchema/loginSchema'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../../models/filters.enum'

const LoginForm = () => {
  const { setLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  // Form validation
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema)
  })

  // on submit form
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(true)
      navigate(`/home/${FILTERS.TODAY}`)
    } catch (error) {
      console.log('error')
    }
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
          {...register('password')}
        />
        {errors.password && <Popover>{errors.password.message}</Popover>}
      </div>
      <button className='btn mt-6 w-full' type='submit'>
        Login
        <i className='bi bi-box-arrow-right ml-2 text-2xl'/>
      </button>
    </form>
  )
}

export default LoginForm
