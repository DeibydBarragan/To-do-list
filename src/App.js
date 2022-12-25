import React from 'react'
import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import TaskList from './components/interface/taskList'
import Navbar from './components/interface/navbar'

function App () {
  return (
    <div className="App bg-gray-900 grid grid-cols-12 text-white">
        <Navbar/>
        <TaskList/>
    </div>
  )
}

export default App
