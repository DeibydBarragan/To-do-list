import React, { useRef } from 'react'
import PropTypes from 'prop-types'

export const InputText = ({ set }) => {
  const inputRef = useRef('')
  const changeValue = () => {
    set(inputRef.current.value)
  }
  return (
    <input ref={inputRef}
        type='text'
        className='rounded-md outline-none bg-slate-800 p-2 shadow-lg'
        onChange={changeValue}
    />
  )
}

InputText.propTypes = {
  set: PropTypes.func
}
