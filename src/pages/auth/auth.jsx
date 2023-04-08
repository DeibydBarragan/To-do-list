import React from 'react'
import Notification from '../../components/pure/notification'
import PropTypes from 'prop-types'
import Login from './container/login'
import Register from './container/register'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../../components/animations/modalAnim'

const Auth = ({ path }) => {
  return (
    <div className='fixed inset-0 background-auth bg-cover'>
      <motion.div className='fixed inset-0 content-center grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-6 sm:p-10 md:p-14 lg:p-16 gap-7'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
      >
        <AnimatePresence>
          {path === 'login' && <Login/>}
        </AnimatePresence>
        <AnimatePresence>
          {path === 'register' && <Register/>}
        </AnimatePresence>
      </motion.div>
      <Notification/>
    </div>
  )
}

Auth.propTypes = {
  path: PropTypes.string.isRequired
}

export default Auth
