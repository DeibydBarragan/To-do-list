import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    document.documentElement.classList.toggle('dark')
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
