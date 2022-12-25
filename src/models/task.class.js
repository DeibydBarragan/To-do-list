import { LEVELS } from './levels.enum'

export class Task {
  id
  name = 'Tarea'
  description = ''
  isCompleted = false
  level = LEVELS.NORMAL

  constructor (id, name, description, isCompleted, level) {
    this.id = id
    this.name = name
    this.description = description
    this.isCompleted = isCompleted
    this.level = level
  }
}
