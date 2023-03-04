import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

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
        <div ref = {drop} className={`mt-3 ${state === null && 'text-gray-400'} bg-slate-800 rounded-lg p-2 flex items-center justify-between cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-xl`}
          onClick={() => setOpen(!open)} >
          {state === null ? placeholder : state}
          <i ref={icon} className={`bi bi-caret-down-fill text-xl ${open && 'transition duration-300 ease-in-out rotate-180'}`}/>
        </div>
        <div className='mt-2'>
        <ul className={`bg-slate-800 absolute divide-y divide-indigo-500 z-10 w-48 rounded-md shadow-xl ${!open && 'hidden'}`}>
           {children}
        </ul>
        </div>
    </div>
  )
}

Select.propTypes = {
  children: PropTypes.any,
  state: PropTypes.string,
  placeholder: PropTypes.string
}

export default Select