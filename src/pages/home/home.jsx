import React, { useContext } from 'react'
import Navbar from '../../components/interface/navbar/navbar'
import TaskList from '../../components/interface/taskList/taskList'
import { FiltersContext } from '../../components/context/filtersContext'
import ProfileView from './container/profileView/profileView'
const Home = () => {
  const { filter } = useContext(FiltersContext)
  return (
    <div className='grid grid-cols-12'>
      <Navbar/>
      { filter === 'profile' ? <ProfileView/> : <TaskList/>}
    </div>
  )
}

export default Home
