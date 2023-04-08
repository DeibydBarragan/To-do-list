import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

const CookiesAdvice = () => {
  const [show, setShow] = useState(!localStorage.getItem('cookies'))
  const handleAgree = () => {
    setShow(false)
    localStorage.setItem('cookies', 'true')
  }
  return createPortal(
    <AnimatePresence>
      { show &&
        <motion.div
          className='fixed inset-0 z-40 backdrop-brightness-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='flex flex-col gap-2 fixed z-50 bottom-0 left-0 mb-4 mx-4 lg:mb-16 lg:mx-20 bg-white border border-indigo-700 text-black rounded-lg shadow-lg p-4 w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className='flex justify-between items-center border-b pb-2 border-gray-400'>
              <div className='flex items-center gap-3'>
                <h2 className='text-indigo-700 dark:text-indigo-700'>Cookies</h2>
                <svg width='50px' viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#4338ca" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.419 12c0-6.4 5.358-8 8.037-8h1.005v4h3.014v3h4.019v1c0 6.4-5.024 8-8.038 8-3.014 0-8.037-1.6-8.037-8zm5.023-4h.001m-2.01 4h0m5.023 1h.001m-2.01 3h0m6.028-1h0"></path></g></svg>
              </div>
            </div>
            <div>
              <p className='text-md text-black dark:text-black'>We use our own and third-party cookies to improve our services</p>
            </div>
            <Link className='cursor-pointer hover:text-indigo-700 underline' to='/cookies'>More information</Link>
            <button className='btn-modal' onClick={handleAgree}>I agree</button>
          </motion.div>
        </motion.div>}
    </AnimatePresence>
    , document.body)
}

export default CookiesAdvice
