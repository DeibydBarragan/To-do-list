import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'
import Loading from '../pages/loading/loading'
import { FILTERS } from '../models/filters.enum'

/**
 * This component returns the routes that don't need the user to be logged in
 * @param {Object} props
 */
const UnauthenticatedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  /**
   * When the user is loading, this component returns the loading page
   */
  if (loading) return <Loading/>
  /**
   * This effect redirects to home page when the user is logged in
   */
  if (user) return <Navigate to={`home/${FILTERS.TODAY}`}/>
  /**
   * This returns the children or the outlet
   */
  return children || <Outlet/>
}
UnauthenticatedRoutes.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default UnauthenticatedRoutes
