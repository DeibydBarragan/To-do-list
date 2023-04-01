import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

const ButtonToday = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
  const handleToday = () => {
    setFilter(FILTERS.TODAY)
    navigate(`/home/${FILTERS.TODAY}`)
  }
  return (
    <button className={`btn ${filter === FILTERS.TODAY && 'btn-selected'}`} onClick={handleToday}>
      <i className="bi bi-calendar-day text-xl"></i>
      Today
    </button>
  )
}

export default ButtonToday
