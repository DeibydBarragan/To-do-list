import React from 'react'
import PropTypes from 'prop-types'

export const H3 = ({ children }) => {
  return (
    <h3 className="text-2xl font-semibold">
        {children}
    </h3>
  )
}

export const H2 = ({ children }) => {
  return (
      <h2 className="text-4xl font-semibold mb-3">
          {children}
      </h2>
  )
}

export const H1 = ({ children }) => {
  return (
        <h1 className="text-5xl font-bold mb-3">
            {children}
        </h1>
  )
}

H3.propTypes = {
  children: PropTypes.any
}
H2.propTypes = {
  children: PropTypes.any
}
H1.propTypes = {
  children: PropTypes.any
}
