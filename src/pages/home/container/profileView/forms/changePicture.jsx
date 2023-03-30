import React from 'react'

const ChangePicture = () => {
  return (
    <div>
      <input type='file' className='hidden' id='uploadPhoto'/>
      <label htmlFor='uploadPhoto' className='btn-settings cursor-pointer'>
        Change picture
        <i className='bi bi-images text-2xl ml-2'/>
      </label>
    </div>
  )
}

export default ChangePicture
