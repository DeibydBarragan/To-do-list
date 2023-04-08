import React from 'react'
import PropTypes from 'prop-types'

const ExternalLink = ({ link, children }) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className='text-indigo-700 dark:text-indigo-300 cursor-pointer underline hover:text-indigo-900 dark:hover:text-indigo-400'
    >
      {children}
    </a>
  )
}

ExternalLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node
}
export default ExternalLink
