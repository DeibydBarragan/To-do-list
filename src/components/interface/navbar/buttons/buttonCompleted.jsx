import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

const ButtonCompleted = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()

  const handleCompleted = () => {
    setFilter(FILTERS.COMPLETED)
    navigate(`/home/${FILTERS.COMPLETED}`)
  }

  return (
    <button className={`btn ${filter === FILTERS.COMPLETED && 'btn-selected'}`} onClick={handleCompleted}>
      <i className="bi-check2-square text-xl"/>
        Completed
    </button>
  )
}

export default ButtonCompleted
