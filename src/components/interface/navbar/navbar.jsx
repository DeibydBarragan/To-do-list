import React, { useContext, useEffect, useState } from 'react'
import { NavbarContext } from '../../context/navbarContext'
import { motion } from 'framer-motion'
import { navbarVariants } from '../../animations/navbarAnim'
import ButtonToday from './buttons/buttonToday'
import ButtonWeek from './buttons/buttonWeek'
import ButtonAll from './buttons/buttonAll'
import ButtonCompleted from './buttons/buttonCompleted'
import ButtonLogout from './buttons/buttonLogout'
import ButtonTheme from './buttons/buttonTheme'
import ProfileNav from './container/profileNav'
import ButtonClose from './buttons/buttonClose'
/**
 *
 * @returns the side navbar
 */
const Navbar = () => {
  // Active filter
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)

  // Close the navbar when the window is resized
  const [width, setWidth] = useState(window.innerWidth)

  // Listener to close navbar
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
  })

  useEffect(() => {
    setNavBarOpen(false)
  }, [width])

  const handleCloseNavbar = (e) => {
    if (e.target.id === 'navbar') {
      setNavBarOpen(false)
    }
  }

  return (
    <motion.div
      variants={ navbarVariants }
      initial='hidden'
      animate='show'
      id='navbar' onClick={(e) => handleCloseNavbar(e)} className={`${navbarOpen ? 'inset-0 grid grid-cols-12' : ''} col-span-3 h-screen fixed lg:sticky z-20 lg:z-auto`}
    >
      <ButtonClose/>
      <div className={`bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700 gap-6 p-4 lg:p-8 top-0 w-auto ${navbarOpen ? 'flex col-span-8 sm:col-span-5 md:col-span-4' : 'hidden lg:flex'} flex-col h-screen fixed`}>
        <ProfileNav/>
        <ButtonToday/>
        <ButtonAll/>
        <ButtonWeek/>
        <ButtonCompleted/>
        <div className='mt-auto grid grid-cols-4 gap-3'>
          <ButtonTheme/>
          <ButtonLogout/>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
