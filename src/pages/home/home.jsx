import React from 'react'
import Navbar from '../../components/interface/navbar'
import TaskList from '../../components/interface/taskList'
import PropTypes from 'prop-types'
import { TasksContextProvider } from '../../components/context/tasksContext'
import { NavbarContextProvider } from '../../components/context/navbarContext'

const Home = ({ filter }) => {
  return (
        <TasksContextProvider>
            <NavbarContextProvider>
                <div className='grid grid-cols-12'>
                    <Navbar/>
                    <TaskList/>
                </div>
            </NavbarContextProvider>
        </TasksContextProvider>
  )
}

Home.propTypes = {
  filter: PropTypes.string
}

export default Home
