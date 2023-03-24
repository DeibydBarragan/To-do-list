import moment from 'moment'
import { FILTERS } from '../models/filters.enum'

export const useSortTasks = (tasks, filter) => {
  const sortTasks = (taskA, taskB) => {
    if (taskA.endDate < taskB.endDate) {
      return -1
    } else if (taskA.endDate > taskB.endDate) {
      return 1
    } else {
      return 0
    }
  }
  const filterTasks = (task) => {
    switch (filter) {
    case FILTERS.ALL: return !task.isCompleted
    case FILTERS.TODAY: return task?.endDate === moment().format('YYYY-MM-DD') && !task.isCompleted
    case FILTERS.COMPLETED: return task.isCompleted
    case FILTERS.NEXTSEVEN: {
      const taskDate = moment(task.endDate)
      const difference = taskDate.diff(moment(), 'days')
      return difference <= 7 && difference >= 0
    }
    }
  }
  const sortedTasks = tasks.sort(sortTasks).filter(filterTasks)
  return sortedTasks
}
