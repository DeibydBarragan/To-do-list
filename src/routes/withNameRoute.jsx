import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/context/authContext'

const WithNameRoute = ({ children }) => {
  const { userName, loading } = useContext(AuthContext)

  if (!userName && !loading) return <Navigate to='/choose-username'/>

  return children || <Outlet/>
}
WithNameRoute.propTypes = {
  user: PropTypes.any,
  children: PropTypes.node
}
export default WithNameRoute
