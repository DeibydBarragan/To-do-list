import React from 'react'

const ChangePicture = () => {
  return (
    <div className='w-full'>
      <input type='file' className='hidden' id='uploadPhoto'/>
      <label htmlFor='uploadPhoto' className='btn-settings cursor-pointer'>
        Change photo
        <i className='bi bi-images text-2xl'/>
      </label>
    </div>
  )
}

export default ChangePicture
