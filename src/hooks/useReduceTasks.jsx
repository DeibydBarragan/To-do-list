import { Task } from '../models/task.class'
import { TYPES } from '../models/taskActions'

/**
   * This function executes different modifications on the tasklist state
   * @param {task} state of the tasks array
   * @param {type} action is the type of the action to execute
   * @returns new state of the array of tasks
   */
export const useReduceTasks = (state, action) => {
  switch (action.type) {
  case TYPES.load: {
    return action.payload
  }
  /**
    * Delete the task of the state
    */
  case TYPES.delete: {
    return state.filter(task => task.id !== action.payload)
  }
  /**
    * push a new instance of the task class into the array
    */
  case TYPES.create: {
    return [
      ...state,
      new Task(
        action.payload.id,
        action.payload.name,
        action.payload.description,
        action.payload.level,
        action.payload.endDate,
        action.payload.isCompleted
      )
    ]
  }
  /**
     * complete a task
     */
  case TYPES.complete: {
    return state.map(task => {
      if (task.id === action.payload) {
        return new Task(task.id, task.name, task.description, task.level, task.endDate, !task.isCompleted)
      }
      return new Task(task.id, task.name, task.description, task.level, task.endDate, task.isCompleted)
    })
  }
  case TYPES.edit: {
    return state.map(task => {
      if (task.id === action.payload.id) {
        return new Task(task.id, action.payload.name, action.payload.description, action.payload.level, action.payload.endDate, task.isCompleted)
      }
      return new Task(task.id, task.name, task.description, task.level, task.endDate, task.isCompleted)
    })
  }
  default: return state
  }
}
