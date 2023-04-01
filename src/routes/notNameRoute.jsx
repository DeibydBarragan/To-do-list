import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'
import { FILTERS } from '../models/filters.enum'

const NotNameRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (user.displayName && !loading) return <Navigate to={`home/${FILTERS.TODAY}`}/>

  return children || <Outlet/>
}
NotNameRoute.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default NotNameRoute
