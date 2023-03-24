import React from 'react'

const ProfileNav = () => {
  return (
    <div className='flex flex-row gap-4 items-center justify-center cursor-pointer'>
      <img className='rounded-full w-12' alt='' src='https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'></img>
      <h2 className='text-2xl'>
        Name
      </h2>
    </div>
  )
}

export default ProfileNav
