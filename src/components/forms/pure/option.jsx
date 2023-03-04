import React from 'react'
import PropTypes from 'prop-types'

const Option = ({ set, children }) => {
  return (
        <li onClick={() => set(children)} className='hover:bg-slate-900 p-2 cursor-pointer rounded-t-md'>
            { children }
        </li>
  )
}

Option.propTypes = {
  children: PropTypes.any,
  set: PropTypes.func
}

export default Option
