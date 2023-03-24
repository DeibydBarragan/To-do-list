import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const NavbarContext = createContext()

const NavbarContextProvider = ({ children }) => {
  const [navbarOpen, setNavBarOpen] = useState(false)

  return (
    <NavbarContext.Provider value={{
      navbarOpen,
      setNavBarOpen
    }}>
      { children }
    </NavbarContext.Provider>
  )
}

NavbarContextProvider.propTypes = {
  children: PropTypes.any
}

export { NavbarContext, NavbarContextProvider }
