import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()
const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)
  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification
      }}
    >
      { children }
    </NotificationContext.Provider>
  )
}
NotificationContextProvider.propTypes = {
  children: PropTypes.any
}

export { NotificationContext, NotificationContextProvider }
