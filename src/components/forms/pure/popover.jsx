import React from 'react'
import propTypes from 'prop-types'
import { motion } from 'framer-motion'

const Popover = ({ children }) => {
  return (
    <motion.div className="absolute z-10 top-10 left-10 w-64 px-4 py-2 bg-white border-red-600 dark:bg-gray-800 border rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <p className='text-red-600 dark:text-red-600 font-semibold break-words'>{ children }</p>
    </motion.div>
  )
}

Popover.propTypes = {
  children: propTypes.node
}

export default Popover
