import React, { useContext } from 'react'
import Navbar from '../../components/interface/navbar/navbar'
import TaskList from '../../components/interface/taskList/taskList'
import { FiltersContext } from '../../components/context/filtersContext'
import ProfileView from './container/profileView/profileView'
import Notification from '../../components/pure/notification'
import { AnimatePresence } from 'framer-motion'
import ButtonCloseNav from '../../components/interface/navbar/buttons/buttonCloseNav'
import CookiesAdvice from '../../components/pure/cookiesAdvice'
/**
 * This component returns the home page
 * @returns returns the home page
 */
const Home = () => {
  const { filter } = useContext(FiltersContext)
  return (
    <div className='grid grid-cols-12'>
      <Navbar/>
      <AnimatePresence>
        { filter === 'profile' ? <ProfileView/> : <TaskList/>}
      </AnimatePresence>
      <ButtonCloseNav/>
      <Notification/>
      <CookiesAdvice/>
    </div>
  )
}

export default Home
