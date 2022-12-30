import React, { useContext } from 'react'
import { NavbarContext } from '../context/navbarContext'
/**
 *
 * @returns the side navbar
 */
const Navbar = () => {
  const { navbarOpen, setNavBarOpen } = useContext(NavbarContext)

  return (
        <div id='navbar' className='col-span-3 fixed lg:sticky z-20 lg:z-auto'>
          <button onClick={() => setNavBarOpen(!navbarOpen)} className='fixed shadow-xl flex items-center top-0 right-0 mt-4 mx-4 rounded-xl p-1 transition ease-in-out hover:scale-110 bg-gradient-to-tl from-indigo-600 to-fuchsia-600 hover:drop-shadow-xl fixed lg:hidden z-10'>
            <i className="bi bi-list text-4xl"></i>
          </button>
          <div className={`bg-gradient-to-tl from-emerald-600 via-indigo-800 to-fuchsia-700 gap-6 p-4 lg:p-8 top-0 w-auto h-screen ${navbarOpen ? 'flex' : 'hidden lg:flex'} flex-col`}>
            <div className='flex flex-row gap-4 items-center justify-center cursor-pointer'>
              <img className='rounded-full w-12' alt='' src='https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'></img>
              <h2 className='text-2xl'>
                Name
              </h2>
            </div>
            {/** Button that redirects to ALL */}
            <button className='btn'>
              <i className="bi bi-calendar3 mr-2 text-xl"></i>
              <span>All</span>
            </button>
            {/** Button that redirects to Today tasks */}
            <button className='btn'>
              <i className="bi bi-calendar-day mr-2 text-xl"></i>
              Today
            </button>
            {/** Button that redirects to Next 7 days */}
            <button className='btn'>
              <i className="bi bi-calendar-date mr-2 text-xl"></i>
              Next 7 days
            </button>
            {/** Button that redirects to Completed */}
            <button className='btn'>
              <i className="bi bi-check2-square mr-2 text-xl"></i>
              Completed
            </button>
            <div className='mt-auto grid grid-cols-4 gap-3'>
              {/** Button that turns on the darkmode */}
              <button className='btn'>
                <i className="bi bi-lightbulb text-3xl"></i>
              </button>
              {/** Button that logouts the user */}
              <button className='btn col-span-3'>
                Logout
                <i className="bi bi-box-arrow-right ml-2 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
  )
}

export default Navbar
