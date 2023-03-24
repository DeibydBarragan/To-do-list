import { LEVELS } from '../models/levels.enum'
import { Task } from '../models/task.class'
//  Task examples
const task1 = new Task(
  Math.random(),
  'Ejemplo',
  'Descripción de ejemplo',
  LEVELS.NORMAL,
  null,
  false
)

const task2 = new Task(
  Math.random(),
  'Ejemplo2',
  'Descripción de ejemplo2',
  LEVELS.URGENT,
  null,
  true
)

const task3 = new Task(
  Math.random(),
  'Ejemplo3',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aaaa',
  LEVELS.NORMAL,
  null,
  false
)

const task4 = new Task(
  Math.random(),
  'Ejemplo4',
  'Descripción de ejemplo4',
  LEVELS.NORMAL,
  null,
  true
)

// List of task examples
export const tasksList = [task1, task2, task3, task4]
