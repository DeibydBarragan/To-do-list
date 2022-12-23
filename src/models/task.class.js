import { LEVELS } from "./levels.enum"

export class Task {
    name = 'Tarea'
    description = ''
    isCompleted = false
    level = LEVELS.NORMAL

    constructor(name, description, isCompleted, level){
        this.name = name
        this.description = description
        this.isCompleted = isCompleted
        this.level = level
    }
}