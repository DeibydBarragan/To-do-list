import React, { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NotificationContext } from '../context/notificationContext'
import { AnimatePresence, motion } from 'framer-motion'

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null)
      }, 8000)
    }
  }, [notification])

  return createPortal(
    <AnimatePresence>
      {notification &&
        <motion.div
          className={`fixed z-20 bottom-0 right-0 mb-4 mx-4 lg:mb-16 lg:mx-20 bg-white border ${notification.type === 'error' ? 'border-red-700' : notification.type === 'success' ? 'border-green-700' : ''} dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg p-4 w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, transition: { type: 'spring', duration: 0.1, stiffness: 300, damping: 18 } }}
        >
          <div className='flex justify-between items-center border-b mb-2 pb-2 border-gray-400 dark:border-gray-700'>
            <div className='flex items-center gap-3'>
              <i className={`bi ${notification.type === 'success' ? 'bi-check-circle-fill text-green-700' : notification.type === 'error' ? 'bi-exclamation-diamond-fill text-red-700' : ''} text-2xl`}/>
              <h4>{notification?.title}</h4>
            </div>
            <i className='bi bi-x-lg text-gray-500 dark:text-gray-700 cursor-pointer text-2xl opacity-70 hover:opacity-90' onClick={() => setNotification(null)} />
          </div>
          <div>
            <p>{notification?.message}</p>
          </div>
        </motion.div>}
    </AnimatePresence>
    , document.body)
}

export default Notification
