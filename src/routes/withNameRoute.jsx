import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'

const WithNameRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (!user.displayName && !loading) return <Navigate to='/choose-username'/>

  return children || <Outlet/>
}
WithNameRoute.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default WithNameRoute
