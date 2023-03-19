import React, { useContext, useEffect, useState } from 'react'
import { NavbarContext } from '../context/navbarContext'
import { FiltersContext } from '../context/filtersContext'
import { useNavigate } from 'react-router-dom'
import { FILTERS } from '../../models/filters.enum'
import { ThemeContext } from '../context/themeContext'
/**
 *
 * @returns the side navbar
 */
const Navbar = () => {
  // Active filter
  const { filter, setFilter } = useContext(FiltersContext)
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)
  const { theme, setTheme } = useContext(ThemeContext)

  // Close the navbar wehen the window is resized
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  // Listener to close navbar
  window.addEventListener('resize', handleResize)

  useEffect(() => {
    setNavBarOpen(false)
  }, [width])

  const handleCloseNavbar = (e) => {
    if (e.target.id === 'navbar') {
      setNavBarOpen(false)
    }
  }

  // Handlers to redirect to routes
  const navigate = useNavigate()

  const handleAll = () => {
    setFilter(FILTERS.ALL)
    navigate(`/home/${FILTERS.ALL}`)
  }

  const handleToday = () => {
    setFilter(FILTERS.TODAY)
    navigate(`/home/${FILTERS.TODAY}`)
  }

  const handleWeek = () => {
    setFilter(FILTERS.NEXTSEVEN)
    navigate(`/home/${FILTERS.NEXTSEVEN}`)
  }

  const handleCompleted = () => {
    setFilter(FILTERS.COMPLETED)
    navigate(`/home/${FILTERS.COMPLETED}`)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
        <div id='navbar' onClick={(e) => handleCloseNavbar(e)} className={`${navbarOpen ? 'inset-0 grid grid-cols-12' : ''} col-span-3 h-screen fixed lg:sticky z-20 lg:z-auto`}>
          <button onClick={() => setNavBarOpen(!navbarOpen)} className='shadow-xl flex items-center top-0 right-0 mt-4 mx-4 rounded-xl p-1 transition ease-in-out hover:scale-110 bg-gradient-to-tl from-indigo-600 to-fuchsia-600 hover:drop-shadow-xl fixed lg:hidden z-10'>
            <i className="bi bi-list text-4xl"></i>
          </button>
          <div className={`bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700 gap-6 p-4 lg:p-8 top-0 w-auto ${navbarOpen ? 'flex col-span-8 sm:col-span-5 md:col-span-4' : 'hidden lg:flex'} flex-col h-screen fixed`}>
            <div className='flex flex-row gap-4 items-center justify-center cursor-pointer'>
              <img className='rounded-full w-12' alt='' src='https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'></img>
              <h2 className='text-2xl'>
                Name
              </h2>
            </div>
            {/** Button that redirects to Today tasks */}
            <button className={`btn ${filter === FILTERS.TODAY && 'btn-selected'}`} onClick={handleToday}>
              <i className="bi bi-calendar-day mr-2 text-xl"></i>
              Today
            </button>
            {/** Button that redirects to ALL */}
            <button className={`btn ${filter === FILTERS.ALL && 'btn-selected'}`} onClick={handleAll}>
              <i className="bi bi-calendar3 mr-2 text-xl"></i>
              All
            </button>
            {/** Button that redirects to Next 7 days */}
            <button className={`btn ${filter === FILTERS.NEXTSEVEN && 'btn-selected'}`} onClick={handleWeek}>
              <i className="bi bi-calendar-date mr-2 text-xl"></i>
              Next 7 days
            </button>
            {/** Button that redirects to Completed */}
            <button className={`btn ${filter === FILTERS.COMPLETED && 'btn-selected'}`} onClick={handleCompleted}>
              <i className="bi bi-check2-square mr-2 text-xl"></i>
              Completed
            </button>
            <div className='mt-auto grid grid-cols-4 gap-3'>
              {/** Button that turns on the darkmode */}
              <button className='btn' onClick={handleTheme}>
                <i className="bi bi-lightbulb text-3xl"></i>
              </button>
              <h4>{theme}</h4>
              {/** Button that logouts the user */}
              <button className='btn col-span-3' onClick={handleLogout}>
                Logout
                <i className="bi bi-box-arrow-right ml-2 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
  )
}

export default Navbar
