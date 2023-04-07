import { React, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FiltersContext } from '../../../context/filtersContext'
import Proptypes from 'prop-types'
import { toUpperFirstChar } from '../../../../helpers/upperFirstChar'

/**
 * This component returns a button that filters the tasks by today
 * @param {string} filter - The filter
 * @param {string} icon - The icon
 * @returns returns a button that filters the tasks
 */
const FilterButton = ({ filter, icon }) => {
  const { setFilter } = useContext(FiltersContext)
  /**
   * This function sets the filter to today and navigates to the home page with the filter today
   */
  const handleOnClick = () => {
    setFilter(filter)
  }
  return (
    <NavLink
      className={({ isActive }) => isActive ? 'btn-selected' : 'btn'}
      to={`/todolist/home/${filter}`}
      onClick={handleOnClick}>
      <i className={`bi bi-${icon} text-xl`}></i>
      {toUpperFirstChar(filter)}
    </NavLink>
  )
}

FilterButton.propTypes = {
  filter: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired
}

export default FilterButton
