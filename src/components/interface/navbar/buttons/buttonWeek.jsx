import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

const ButtonWeek = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
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
