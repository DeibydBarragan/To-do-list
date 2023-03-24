import { React, useContext } from 'react'
import { NavbarContext } from '../../../context/navbarContext'

const ButtonClose = () => {
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)

  return (
    <button onClick={() => setNavBarOpen(!navbarOpen)}
      className='shadow-xl flex items-center top-0 right-0 mt-4 mx-4 rounded-xl p-1 bg-gradient-to-tl from-indigo-600 to-fuchsia-600 hover:drop-shadow-xl fixed lg:hidden z-10'
    >
      <i className="bi bi-list text-4xl"></i>
    </button>
  )
}

export default ButtonClose
