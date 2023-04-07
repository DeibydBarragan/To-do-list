import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../models/filters.enum'
import { motion } from 'framer-motion'
import { modalVariants } from './../../components/animations/modalAnim'

/**
 * Component that returns the 404 page
 * @returns returns the 404 page
 */
const NotFound = () => {
  const navigate = useNavigate()
  /**
   * This function navigates to the home page
   */
  const backHandler = () => {
    navigate(`/todolist/home/${FILTERS.TODAY}`)
  }

  return (
    <div className='h-screen background-auth grid place-content-center'>
      <motion.div
        className='bg-black bg-opacity-40 backdrop-blur-sm rounded-xl shadow-xl p-9 grid'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
      >
        <h1 className='text-9xl text-white justify-self-center'>404</h1>
        <h1 className='text-4xl text-white sm:text-5xl'>Page not found</h1>
        <button className='btn justify-self-center mt-5' onClick={backHandler}>Back to home</button>
      </motion.div>
    </div>
  )
}

export default NotFound
