import React from 'react'
import Button from '../pure/button'

/**
 *
 * @returns the side navbar
 */
const Navbar = () => {
  return (
        <div className='bg-indigo-800 flex flex-col gap-6 p-8 col-span-3 h-screen sticky top-0'>
          <div className='flex flex-row gap-4 items-center justify-center cursor-pointer'>
            <img className='rounded-full w-12' alt='' src='https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'></img>
            <h2 className='text-2xl'>
              Name
            </h2>
          </div>
          {/** Button that redirects to ALL */}
          <Button>
            <i className="bi bi-calendar3 mr-2 text-xl"></i>
            <span>All</span>
          </Button>
          {/** Button that redirects to ALL */}
          <Button>
            <i className="bi bi-calendar-day mr-2 text-xl"></i>
            Today
          </Button>
          {/** Button that redirects to Next 7 days */}
          <Button>
            <i className="bi bi-calendar-date mr-2 text-xl"></i>
            Next 7 days
          </Button>
          {/** Button that redirects to Completed */}
          <Button>
            <i className="bi bi-check2-square mr-2 text-xl"></i>
            Completed
          </Button>
          <div className='mt-auto grid grid-cols-4 gap-3'>
            {/** Button that turns on the darkmode */}
            <Button>
              <i className="bi bi-lightbulb text-3xl"></i>
            </Button>
            {/** Button that logouts the user */}
            <Button otherClasses='col-span-3'>
              Logout
              <i className="bi bi-box-arrow-right ml-2 text-xl"></i>
            </Button>
          </div>
        </div>
  )
}

export default Navbar
