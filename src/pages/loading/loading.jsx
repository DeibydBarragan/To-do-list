import React from 'react'
import Charging from '../../components/pure/charging'

const Loading = () => {
  return (
    <div className='fixed inset-0 content-center background-auth bg-cover grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-6 sm:p-10 md:p-14 lg:p-16 gap-7'>
      <div className='backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
        <Charging/>
      </div>
    </div>
  )
}

export default Loading
