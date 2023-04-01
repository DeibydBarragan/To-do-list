import React, { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../../../components/animations/modalAnim'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { chooseNameSchema } from '../../../components/forms/formSchema/chooseNameSchema'
import { AuthContext } from '../../../components/context/authContext'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../../models/filters.enum'
import Popover from '../../../components/forms/pure/popover'
import { updateProfile } from 'firebase/auth'

const ChooseUsername = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)
  // Form validation
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(chooseNameSchema)
  })
  // Submit form
  const onSubmit = async (data) => {
    await updateProfile(user, { displayName: data.username })
    setUser({ ...user, displayName: data.username })
    navigate(`/home/${FILTERS.TODAY}`)
  }

  return (
    <div className='grid place-content-center fixed inset-0 background-auth bg-cover p-2'>
      <motion.form className='flex flex-col p-8 rounded-lg shadow-2xl bg-gradient-to-tr from-purple-800 to-orange-500 gap-3'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Welcome</h1>
        <h3>Choose Username</h3>
        <div className='relative'>
          <input
            type='text'
            className='input-auth'
            placeholder='Username'
            autoComplete='off'
            maxLength='15'
            {...register('username')}
          />
          <AnimatePresence>
            {errors.username && <Popover>{errors.username.message}</Popover>}
          </AnimatePresence>
        </div>
        <button className='btn justify-self-center' type='submit'>Accept</button>
      </motion.form>
    </div>
  )
}

export default ChooseUsername
