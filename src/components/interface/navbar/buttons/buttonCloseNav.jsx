import { React, useContext } from 'react'
import { NavbarContext } from '../../../context/navbarContext'
import { createPortal } from 'react-dom'

const ButtonCloseNav = () => {
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)

  return createPortal(
    <button onClick={() => setNavBarOpen(!navbarOpen)}
      className='font-semibold text-xl shadow-xl flex lg:hidden items-center fixed top-0 right-0 mt-4 mx-4 md:mb-16 md:mx-20 rounded-xl p-1 transition ease-in-out bg-gradient-to-tl from-indigo-600 to-fuchsia-600 z-30'
    >
      <i className="bi bi-list text-4xl"></i>
    </button>
    , document.body)
}

export default ButtonCloseNav
