import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const ModalContext = createContext()

const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ModalContext.Provider value={{
      modalOpen,
      setModalOpen
    }}>
      { children }
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.any
}

export { ModalContext, ModalContextProvider }
