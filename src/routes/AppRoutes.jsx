import React from 'react'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import Home from '../pages/home/home'
import NotFound from '../pages/404/notFound'
import { FILTERS } from '../models/filters.enum'
import ChooseUsername from '../pages/auth/forms/chooseUsername'
import ProtectedRoutes from './protectedRoutes'
import NotNameRoute from './notNameRoute'
import WithNameRoute from './withNameRoute'
import UnauthenticatedRoutes from './unauthenticadedRoutes'
import { FiltersContextProvider } from '../components/context/filtersContext'
import Auth from '../pages/auth/auth'
import Cookies from '../pages/cookies'

/**
 * This component returns the app routes
 * @returns returns the app routes
 */
const AppRoutes = () => {
  return (
    <HashRouter>
      <FiltersContextProvider>
        <Routes>
          {/**
               * This routes are for the routes that need the user to be authenticated
               */}
          <Route element={<ProtectedRoutes/>}>
            {/** This route is for the rotes that need the user to have an username */}
            <Route path='home/' element={<WithNameRoute/>}>
              {/**
                   * This routes are for the filters
                   */}
              {Object.values(FILTERS).map((filter) => (<Route key={filter} path={`${filter}`} element={<Home filter={filter}/>}/>))}
              {/** This route is for the profile view */}
              <Route path='profile' element={<Home/>}/>
            </Route>
            {/** This route redirect to chooseUsername page when the user doesn't have one */}
            <Route element={<NotNameRoute/>}>
              <Route path='choose-username' element={<ChooseUsername/>}/>
            </Route>
          </Route>
          {/** This routes are for the routes that don't need the user to be authenticated */}
          <Route element={<UnauthenticatedRoutes/>}>
            <Route path='login' element={<Auth path='login'/>}/>
            <Route path='register' element={<Auth path='register'/>}/>
          </Route>
          {/** This route is for the 404 page */}
          <Route path='*' element={<NotFound/>}/>
          <Route path='/cookies' element={<Cookies/>}/>
          <Route path='/' element={<Navigate to='/login'/>}/>
        </Routes>
      </FiltersContextProvider>
    </HashRouter>
  )
}

export default AppRoutes
