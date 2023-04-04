import React from 'react'
import { dayToString, monthToString } from '../../../../helpers/dates'
import moment from 'moment'

const TodayDate = () => {
  return (
    <h4 className='mt-2'>
      {dayToString(moment().weekday())}, {monthToString(moment().month())},{' '}
      {moment().date()}
    </h4>
  )
}

export default TodayDate
