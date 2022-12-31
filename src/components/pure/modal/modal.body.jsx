import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = ({ children }) => {
  return (
        <div className='flex flex-col h-full'>
            {children}
        </div>
  )
}

ModalBody.propTypes = {
  children: PropTypes.any
}

export default ModalBody
