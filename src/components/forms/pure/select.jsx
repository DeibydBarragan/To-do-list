import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'

const Select = ({ children, state, placeholder }) => {
  /**
   * state for the dropdown, when it is false, it isn't open
   */
  const [open, setOpen] = useState(false)
  const drop = useRef()
  const icon = useRef()
  /**
   *This function is for closing the dropdown when the user touches an element different to the icon or the drop button
   * @param {InstanceType} e event
   */
  const handleCloseDrop = (e) => {
    if (drop.current !== e.target && icon.current !== e.target) {
      setOpen(false)
    }
  }
  document.addEventListener('click', (e) => {
    handleCloseDrop(e)
  })
  return (
    <div>
      <div ref = {drop} className={`text-black dark:text-white ${!state && 'dark:text-gray-400'} bg-white dark:bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out border border-indigo-700 dark:border-none`}
        onClick={() => setOpen(!open)} >
        {state || placeholder}
        <i ref={icon} className={`bi bi-caret-down-fill text-indigo-700 dark:text-white text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}/>
      </div>
      <motion.div className='mt-2 divide-y-2'>
        <AnimatePresence>
          { open &&
            <motion.ul
              className='bg-white border border-indigo-700 dark:bg-slate-800 absolute divide-y divide-indigo-500 z-10 w-48 rounded-md shadow-xl'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.2 }
              }}
            >
              {children}
            </motion.ul>}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

Select.propTypes = {
  children: PropTypes.any,
  state: PropTypes.string,
  placeholder: PropTypes.string
}

export default Select
