import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'
import Loading from '../pages/loading/loading'
import { FILTERS } from '../models/filters.enum'

const UnauthenticatedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <Loading/>

  if (user) return <Navigate to={`home/${FILTERS.TODAY}`}/>

  return children || <Outlet/>
}
UnauthenticatedRoutes.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default UnauthenticatedRoutes
