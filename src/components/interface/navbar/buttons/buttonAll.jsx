import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

/**
 * This component returns a button that filters the tasks by all
 */
const ButtonAll = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
  /**
   * This function sets the filter to all and navigates to the home page with the filter all
   */
  const handleAll = () => {
    setFilter(FILTERS.ALL)
    navigate(`/home/${FILTERS.ALL}`)
  }
  return (
    <button className={`btn ${filter === FILTERS.ALL && 'btn-selected'}`} onClick={handleAll}>
      <i className="bi bi-calendar3 text-xl"></i>
        All
    </button>
  )
}

export default ButtonAll
