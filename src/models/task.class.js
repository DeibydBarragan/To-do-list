/**
 * Task class
 */
export class Task {
  id
  name
  description
  level
  isCompleted
  endDate

  constructor (id, name, description, level, endDate, isCompleted) {
    this.id = id
    this.name = name
    this.description = description
    this.level = level
    this.endDate = endDate
    this.isCompleted = isCompleted
  }
}
