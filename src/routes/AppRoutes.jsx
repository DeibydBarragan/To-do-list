import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Home from '../pages/home/home'
import { FILTERS } from '../models/filters.enum'

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home filter={FILTERS.ALL}/>}/>
          <Route path='/home/today' element={<Home filter={FILTERS.TODAY}/>}/>
          <Route path='/home/week' element={<Home filter={FILTERS.NEXTSEVEN}/>}/>
          <Route path='/home/completed' element={<Home filter={FILTERS.COMPLETED}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default AppRoutes
