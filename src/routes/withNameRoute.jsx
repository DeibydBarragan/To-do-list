import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'

/**
 * This component returns the routes that need the user to have an username
 * @param {Object} props
 */
const WithNameRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  /**
   * This effect redirects to choose username page when the user doesn't have an username
   */
  if (!user.displayName && !loading) return <Navigate to='/todolist/choose-username'/>
  /**
   * This returns the children or the outlet
   */
  return children || <Outlet/>
}
WithNameRoute.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default WithNameRoute
