import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'
import { FILTERS } from '../models/filters.enum'

/**
 * This component returns the routes that need the user to don't have an username
 * @param {Object} props
 */
const NotNameRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  /**
   * This effect redirects to home page when the user has an username
   */
  if (user.displayName && !loading) return <Navigate to={`Tasklist/home/${FILTERS.TODAY}`}/>

  return children || <Outlet/>
}
NotNameRoute.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default NotNameRoute
