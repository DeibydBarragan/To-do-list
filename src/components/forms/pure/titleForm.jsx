import React from 'react'
import PropTypes from 'prop-types'

const TitleForm = ({ children }) => {
  return (
    <h2 className='text-3xl sm:text-4xl border-b pb-2 border-b-gray-300 dark:border-gray-800'>
      {children}
    </h2>
  )
}

TitleForm.propTypes = {
  children: PropTypes.string
}

export default TitleForm
