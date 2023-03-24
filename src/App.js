import React from 'react'
import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from './routes/AppRoutes'

function App () {
  return (
    <div className="App dark:bg-gray-900 text-white bg-white gap-5 font-montserrat">
      <AppRoutes/>
    </div>
  )
}

export default App
