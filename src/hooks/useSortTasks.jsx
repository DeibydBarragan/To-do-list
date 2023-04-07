import moment from 'moment'
import { FILTERS } from '../models/filters.enum'

/**
 * This function sorts the tasks by date and filter them by the filter selected
 * @param {array} tasks - The tasks
 * @param {string} filter - The filter
 * @returns the sorted and filtered tasks
 */
export const useSortTasks = (tasks, filter) => {
  /**
   * This function sorts the tasks by date
   * @param {task} taskA
   * @param {task} taskB
   * @returns the sorted tasks
   */
  const sortTasks = (taskA, taskB) => {
    if (taskA.endDate < taskB.endDate) {
      return -1
    } else if (taskA.endDate > taskB.endDate) {
      return 1
    } else {
      return 0
    }
  }
  /**
   * This function filters the tasks by the filter selected
   * @param {task} task
   * @returns the filtered tasks
   */
  const filterTasks = (task) => {
    switch (filter) {
    /**
     * If the filter is all, return all the tasks that are not completed
     */
    case FILTERS.ALL: return !task.isCompleted
    /**
     * If the filter is today, return all the tasks that are not completed and have the same date as today
     */
    case FILTERS.TODAY: return task?.endDate === moment().format('YYYY-MM-DD') && !task.isCompleted
    /**
     * If the filter is completed, return all the tasks that are completed
     */
    case FILTERS.COMPLETED: return task.isCompleted
    /**
     * If the filter is next seven days, return all the tasks that are not completed and have a date between today and the next seven days
     */
    case FILTERS.NEXTSEVEN: {
      const taskDate = moment(task.endDate)
      const difference = taskDate.diff(moment(), 'days')
      return difference <= 7 && difference >= 0 && !task.isCompleted
    }
    }
  }
  /**
   * This function sorts the tasks by date and filter them by the filter selected
   */
  const sortedTasks = tasks.sort(sortTasks).filter(filterTasks)
  return sortedTasks
}
