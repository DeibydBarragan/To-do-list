import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * This component returns a popover
 * @param {show} param0 show is the message to show
 * @param {setShow} param1 setShow is the function to set the message to show
 * @param {clear} param2 clear is the function to clear the errors of the form
 * @param {fieldName} param3 fieldName is the name of the field of the form to clear its errors
 */
const Popover = ({ show, setShow, clear, fieldName }) => {
  useEffect(() => {
    /**
     * If setShow is defined, set a timeout to clear the message
     */
    if (setShow) {
      const timeout = setTimeout(() => {
        setShow(null)
      }, 8000)
      return () => clearTimeout(timeout)
    }
    /**
     * If clear is defined, set a timeout to clear the errors of the form
     */
    if (clear) {
      const timeout = setTimeout(() => {
        /**
         * If fieldName is defined, clear the errors of the field
         */
        fieldName ? clear(fieldName) : clear()
      }, 8000)
      return () => clearTimeout(timeout)
    }
  }, [show])

  return (
    <AnimatePresence>
      { show && (
        <motion.div className="absolute z-20 top-12 right-1 w-auto px-4 py-2 bg-white border-red-600 dark:bg-gray-800 border rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
        >
          <p className='text-red-600 dark:text-red-600 font-semibold break-words text-md'>{ show }</p>
        </motion.div>)}
    </AnimatePresence>
  )
}

Popover.propTypes = {
  children: propTypes.node,
  show: propTypes.any,
  setShow: propTypes.func,
  clear: propTypes.func,
  fieldName: propTypes.string
}

export default Popover
