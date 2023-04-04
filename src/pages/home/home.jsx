import React, { useContext } from 'react'
import Navbar from '../../components/interface/navbar/navbar'
import TaskList from '../../components/interface/taskList/taskList'
import { FiltersContext } from '../../components/context/filtersContext'
import ProfileView from './container/profileView/profileView'
import Notification from '../../components/pure/notification'
import { AnimatePresence } from 'framer-motion'
const Home = () => {
  const { filter } = useContext(FiltersContext)
  return (
    <div className='grid grid-cols-12'>
      <Navbar/>
      <AnimatePresence>
        { filter === 'profile' ? <ProfileView/> : <TaskList/>}
      </AnimatePresence>
      <Notification/>
    </div>
  )
}

export default Home
