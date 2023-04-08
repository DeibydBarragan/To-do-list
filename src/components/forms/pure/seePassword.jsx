import React, { useState } from 'react'
import propTypes from 'prop-types'

/**
 * This component returns the see password icon
 * @param {string} id - The id of the input
 * @param {boolean} theme - If true the theme properties are applied
 */
const SeePassword = ({ id, theme = true }) => {
  const [seePassword, setSeePassword] = useState(false)

  /**
   * This function toggles the see password icon
   * get the input type and set it to the opposite
   */
  const toggleSeePassword = () => {
    document.getElementById(id).type = seePassword ? 'password' : 'text'
    setSeePassword(!seePassword)
  }

  return (
    <i className={`bi bi-${seePassword ? 'eye' : 'eye-slash'} ${theme ? 'text-indigo-800 dark:text-white' : 'text-white'} text-2xl absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer`} onClick={toggleSeePassword}/>
  )
}

SeePassword.propTypes = {
  id: propTypes.string,
  theme: propTypes.bool
}

export default SeePassword
