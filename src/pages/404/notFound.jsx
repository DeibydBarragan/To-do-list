import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../models/filters.enum'
import { motion } from 'framer-motion'
import { modalVariants } from './../../components/animations/modalAnim'

const NotFound = () => {
  const navigate = useNavigate()
  const backHandler = () => {
    navigate(`/home/${FILTERS.TODAY}`)
  }
  return (
    <div className='h-screen background-auth grid place-content-center'>
      <motion.div
        className='bg-black bg-opacity-40 backdrop-blur-sm rounded-xl shadow-xl p-9 grid'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
      >
        <h1 className='text-9xl justify-self-center'>404</h1>
        <h1 className='text-4xl sm:text-5xl'>Page not found</h1>
        <button className='btn justify-self-center mt-5' onClick={backHandler}>Back to home</button>
      </motion.div>
    </div>
  )
}

export default NotFound
