import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const FiltersContext = createContext()
const FiltersContextProvider = ({ children }) => {
  const location = useLocation()
  const [filter, setFilter] = useState(null)
  useEffect(() => {
    setFilter(location.pathname.split('/')[2]?.toLowerCase())
  }, [location])
  return (
    <FiltersContext.Provider value={{
      filter,
      setFilter
    }}>
      { children }
    </FiltersContext.Provider>
  )
}

FiltersContextProvider.propTypes = {
  children: PropTypes.any
}

export { FiltersContext, FiltersContextProvider }
