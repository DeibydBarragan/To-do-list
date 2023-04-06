import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

/**
 * This component returns a button that filters the tasks by completed
 * @returns returns a button that filters the tasks by completed
 */
const ButtonCompleted = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
  /**
   * This function sets the filter to completed and navigates to the home page with the filter completed
   */
  const handleCompleted = () => {
    setFilter(FILTERS.COMPLETED)
    navigate(`/Tasklist/home/${FILTERS.COMPLETED}`)
  }

  return (
    <button className={`btn ${filter === FILTERS.COMPLETED && 'btn-selected'}`} onClick={handleCompleted}>
      <i className="bi-check2-square text-xl"/>
        Completed
    </button>
  )
}

export default ButtonCompleted
