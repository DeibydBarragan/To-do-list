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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <FiltersContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoutes/>}>
            <Route path='home/' element={<WithNameRoute/>}>
              {Object.values(FILTERS).map((filter) => (<Route key={filter} path={`${filter}`} element={<Home filter={filter}/>}/>))}
              <Route path='profile' element={<Home/>}/>
            </Route>
            <Route element={<NotNameRoute/>}>
              <Route path='choose-username' element={<ChooseUsername/>}/>
            </Route>
          </Route>
          <Route element={<UnauthenticatedRoutes/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </FiltersContextProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
