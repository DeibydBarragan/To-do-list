import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  useEffect(() => {
    localStorage.getItem('theme') && document.documentElement.classList.add(localStorage.getItem('theme'))
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
    localStorage.getItem('theme')
      ? localStorage.removeItem('theme')
      : localStorage.setItem('theme', 'dark')
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
