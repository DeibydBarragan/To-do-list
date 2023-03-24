import React from 'react'
import Navbar from '../../components/interface/navbar/navbar'
import TaskList from '../../components/interface/taskList/taskList'
import PropTypes from 'prop-types'
import { TasksContextProvider } from '../../components/context/tasksContext'
import { NavbarContextProvider } from '../../components/context/navbarContext'
import { FiltersContextProvider } from '../../components/context/filtersContext'
const Home = ({ filter }) => {
  return (
    <TasksContextProvider>
      <NavbarContextProvider>
        <FiltersContextProvider>
          <div className='grid grid-cols-12'>
            <Navbar filter={ filter }/>
            <TaskList filter={ filter }/>
          </div>
        </FiltersContextProvider>
      </NavbarContextProvider>
    </TasksContextProvider>
  )
}

Home.propTypes = {
  filter: PropTypes.string
}

export default Home
