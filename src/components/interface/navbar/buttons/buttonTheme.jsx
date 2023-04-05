import { React, useContext } from 'react'
import { ThemeContext } from '../../../context/themeContext'

/**
 * This component returns a button that changes the theme
 * @returns returns a button that changes the theme
 */
const ButtonTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  /**
   * This function changes the theme
   */
  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button className='btn' onClick={handleTheme}>
      <i className="bi bi-lightbulb text-3xl"></i>
    </button>
  )
}

export default ButtonTheme
