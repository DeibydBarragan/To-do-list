import React from 'react'
import PropTypes from 'prop-types'

const ModalFooter = ({ children }) => {
  return (
        <div className='mt-auto'>
            {children}
        </div>
  )
}

ModalFooter.propTypes = {
  children: PropTypes.any
}

export default ModalFooter
