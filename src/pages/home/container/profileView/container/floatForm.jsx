import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import propTypes from 'prop-types'

const FloatForm = ({ show, setShow, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="absolute z-30 top-14 right-3 w-64 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          id='float-form'
        >
          {children}
        </motion.div>)}
    </AnimatePresence>
  )
}

FloatForm.propTypes = {
  children: propTypes.node,
  show: propTypes.bool,
  setShow: propTypes.func
}

export default FloatForm
