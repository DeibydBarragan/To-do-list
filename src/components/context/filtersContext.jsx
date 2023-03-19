import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FILTERS } from '../../models/filters.enum'

const FiltersContext = createContext()
const FiltersContextProvider = ({ children }) => {
  const [filter, setFilter] = useState(FILTERS.TODAY)
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
