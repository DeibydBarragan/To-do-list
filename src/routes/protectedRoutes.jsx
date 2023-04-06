import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'
import Loading from '../pages/loading/loading'

/**
 * This component returns the routes that need the user to be logged in
 * @param {Object} props
 */
const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  /**
   * When the user is loading, this component returns the loading page
   */
  if (loading) {
    return <Loading/>
  }
  /**
   * This effect redirects to login page when the user is not logged in
   */
  if (!user) {
    return <Navigate to='/Tasklist/login'/>
  }
  /**
   * This returns the children or the outlet
   */
  return children || <Outlet/>
}
ProtectedRoutes.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default ProtectedRoutes
