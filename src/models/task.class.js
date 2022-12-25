export class Task {
  id
  name
  description
  level
  isCompleted

  constructor (id, name, description, level, isCompleted) {
    this.id = id
    this.name = name
    this.description = description
    this.level = level
    this.isCompleted = isCompleted
  }
}
