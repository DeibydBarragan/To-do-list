/**
 * Function that receives a number between 0 and 6 to return the name of that day in the week
 * @param {number} day
 * @returns
 */
export const dayToString = (day) => {
  return day === 0
    ? 'Sunday'
    : day === 1
      ? 'Monday'
      : day === 2
        ? 'Tuesday'
        : day === 3
          ? 'Wednesday'
          : day === 4
            ? 'Thursday'
            : day === 5
              ? 'Friday'
              : day === 6 && 'Saturday'
}

/**
 * Function that receives a number between 0 and 11 to return the name of that month
 * @param {number} month
 * @returns
 */
export const monthToString = (month) => {
  return month === 0
    ? 'January'
    : month === 1
      ? 'February'
      : month === 2
        ? 'March'
        : month === 3
          ? 'April'
          : month === 4
            ? 'May'
            : month === 5
              ? 'June'
              : month === 6
                ? 'Jule'
                : month === 7
                  ? 'August'
                  : month === 8
                    ? 'September'
                    : month === 9
                      ? 'October'
                      : month === 10
                        ? 'November'
                        : month === 11 && 'December'
}
