import { React, useContext } from 'react'
import { FILTERS } from '../../../../models/filters.enum'
import { useNavigate } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'

const ButtonAll = () => {
  const { filter, setFilter } = useContext(FiltersContext)
  const navigate = useNavigate()
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
