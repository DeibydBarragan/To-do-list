import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Home from '../pages/home/home'
import NotFound from '../pages/404/notFound'
import { FILTERS } from '../models/filters.enum'
import ChooseUsername from '../pages/auth/forms/chooseUsername'
import ProtectedRoutes from './protectedRoutes'
import NotNameRoute from './notNameRoute'
import WithNameRoute from './withNameRoute'
import UnauthenticatedRoutes from './unauthenticadedRoutes'
import { FiltersContextProvider } from '../components/context/filtersContext'

/**
 * This component returns the app routes
 * @returns returns the app routes
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <FiltersContextProvider>
        <Routes>
          <Route path='Tasklist/'>
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
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
            </Route>
            {/** This route is for the 404 page */}
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </FiltersContextProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
