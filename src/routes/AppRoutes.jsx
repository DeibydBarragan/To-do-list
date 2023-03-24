import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Home from '../pages/home/home'
import NotFound from '../pages/404/notFound'
import { FILTERS } from '../models/filters.enum'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/home/${FILTERS.ALL}`} element={<Home filter={FILTERS.ALL}/>}/>
        <Route path={`/home/${FILTERS.TODAY}`} element={<Home filter={FILTERS.TODAY}/>}/>
        <Route path={`/home/${FILTERS.NEXTSEVEN}`} element={<Home filter={FILTERS.NEXTSEVEN}/>}/>
        <Route path={`/home/${FILTERS.COMPLETED}`} element={<Home filter={FILTERS.COMPLETED}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
