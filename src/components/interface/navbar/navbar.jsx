import React, { useContext, useEffect, useState } from 'react'
import { NavbarContext } from '../../context/navbarContext'
import { AnimatePresence, motion } from 'framer-motion'
import ButtonLogout from './buttons/buttonLogout'
import ButtonTheme from './buttons/buttonTheme'
import ProfileNav from './container/profileNav'
import FilterButton from './buttons/filterButton'
import { FILTERS } from '../../../models/filters.enum'
/**
 * This component returns the side navbar
 * @returns the side navbar
 */
const Navbar = () => {
  // Active filter
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)

  /**
   * This function closes the navbar when the window is resized
   */
  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
  })

  useEffect(() => {
    setNavBarOpen(false)
  }, [width])

  /**
   * This function closes the navbar when the user clicks outside of it
   * @param {Event} e - The event
   * @returns closes the navbar
   */
  const handleCloseNavbar = (e) => {
    if (e.target.id === 'navbar') {
      setNavBarOpen(false)
    }
  }

  return (
    <AnimatePresence>
      { (navbarOpen || width > 1023) &&
        <nav
          id='navbar' onClick={(e) => handleCloseNavbar(e)} className={`${navbarOpen ? 'inset-0 grid grid-cols-12 backdrop-blur-sm' : 'h-screen'} col-span-3 fixed lg:sticky z-20 lg:z-auto`}
        >
          <motion.div
            className='bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700 gap-6 p-4 lg:p-8 top-0 flex col-span-8 sm:col-span-5 md:col-span-4 flex-col h-screen fixed z-50'
            initial={{ x: -270 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ x: -270 }}
          >
            <ProfileNav/>
            {/** Today tasks button */}
            <FilterButton filter={FILTERS.TODAY} icon='calendar-day'/>
            {/** Next seven days tasks button */}
            <FilterButton filter={FILTERS.ALL} icon='calendar3'/>
            {/** All tasks button */}
            <FilterButton filter={FILTERS.NEXTSEVEN} icon='calendar-date'/>
            {/** Completed tasks button */}
            <FilterButton filter={FILTERS.COMPLETED} icon='check2-square'/>
            <div className='mt-auto grid grid-cols-4 gap-3'>
              <ButtonTheme/>
              <ButtonLogout/>
            </div>
          </motion.div>
        </nav>}
    </AnimatePresence>
  )
}

export default Navbar
