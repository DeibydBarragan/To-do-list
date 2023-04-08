import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  /**
   * State for the theme
   * Get the theme from the localstorage
   */
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  /**
   * Add the theme to the document from the localstorage
   */
  useEffect(() => {
    localStorage.getItem('theme') && document.documentElement.classList.add(localStorage.getItem('theme'))
  }, [])

  /**
   * Toggle the theme in the document and in the localstorage
   */
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}>
      { children }
    </ThemeContext.Provider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any
}
export { ThemeContext, ThemeContextProvider }
