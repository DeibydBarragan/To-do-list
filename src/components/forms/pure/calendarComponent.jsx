import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { AnimatePresence, motion } from 'framer-motion'

const CalendarComponent = ({ date, setDate }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  /**
   * This function closes the calendar when the user selects a date
   * Also formats the date to YYYY-MM-DD
   */
  useEffect(() => {
    setShowCalendar(false)
    if (date) {
      setDate(moment(date).format('YYYY-MM-DD'))
    }
  }, [date])

  /**
   * This function handles the calendar
   * If the user clicks on the calendar icon, the calendar will be shown
   * If the user clicks on the delete icon, the date will be deleted
   * @param {InstanceType} e the event that triggers the function
   */
  const handleCalendar = (e) => {
    if (e.target.id !== 'delete') {
      setShowCalendar(!showCalendar)
    }
  }

  return (
    <div className='relative'>
      <label className='input-tasks flex justify-between items-center cursor-pointer' onClick={handleCalendar}>
        {
          date
            ? moment(date).format('YYYY-MM-DD')
            : <p className='italic text-gray-500 dark:text-gray-500'>Select an end date</p>
        }
        <div className='flex gap-3'>
          <AnimatePresence>
            {date &&
              /** Delete icon */
              <motion.i
                className='bi bi-trash text-2xl text-indigo-700 dark:text-white'
                id='delete'
                onClick={() => setDate('')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />}
          </AnimatePresence>
          {/** Calendar icon */}
          <i className='bi bi-calendar3 text-indigo-700 dark:text-white text-xl'/>
        </div>
      </label>
      {/** Calendar */}
      <AnimatePresence>
        {showCalendar &&
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Calendar
              onChange={setDate}
              value={date}
            />
          </motion.div>}
      </AnimatePresence>
    </div>
  )
}

CalendarComponent.propTypes = {
  date: PropTypes.any,
  setDate: PropTypes.func
}

export default CalendarComponent
