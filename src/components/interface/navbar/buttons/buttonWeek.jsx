import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

const ButtonWeek = () => {
  /**
   * This component returns a button that filters the tasks by next 7 days
   * @returns returns a button that filters the tasks by next 7 days
   */
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
  /**
   * This function sets the filter to next 7 days and navigates to the home page with the filter next 7 days
   */
  const handleWeek = () => {
    setFilter(FILTERS.NEXTSEVEN)
    navigate(`/home/${FILTERS.NEXTSEVEN}`)
  }
  return (
    <button className={`btn ${filter === FILTERS.NEXTSEVEN && 'btn-selected'}`} onClick={handleWeek}>
      <i className="bi bi-calendar-date text-xl"></i>
        Next 7 days
    </button>
  )
}

export default ButtonWeek
