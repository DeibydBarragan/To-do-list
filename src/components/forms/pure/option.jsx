import React from 'react'
import PropTypes from 'prop-types'

/**
 * This component returns a list item with the option
 * @param {set} param0 set is the function to set the value of the option
 * @returns returns a list item with the option
 */
const Option = ({ set, children }) => {
  return (
    <li onClick={() => set(children)} className='hover:bg-slate-300 dark:hover:bg-slate-900 p-2 cursor-pointer rounded-t-md rounded-b-md text-black dark:text-white'>
      { children }
    </li>
  )
}

Option.propTypes = {
  children: PropTypes.any,
  set: PropTypes.func
}

export default Option
