import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param {text} param0 otherClasses in adition to the butonClass - optional
 * @param {text} param1 color of the button if it is required
 * @param {func} param2 not optional - onClick must be a function that de button executes
 * @param {html} param3 the children elements of this component
 * @returns
 */
const Button = ({ otherClasses = '', color = ' bg-indigo-700 ', onClick, children }) => {
  return (
        <button
            className= { ' p-2 rounded-lg font-semibold text-lg drop-shadow-lg transition ease-in-out hover:bg-indigo-600 ' + color + otherClasses }
            onClick= {onClick}
        >

            {/** Here is where the children will be rendered */}
            {children}
        </button>

  )
}

Button.propTypes = {
  color: PropTypes.string,
  otherClasses: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any
}

export default Button
