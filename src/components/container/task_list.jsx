import React, { useEffect, useState } from 'react';
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';
import Button from '../pure/button';

const TaskList = () => {

    const defaultTask = new Task('Ejemplo', 'Descripción de ejemplo', false, LEVELS.NORMAL);

    //Component state
    const [tasks, setTasks] = useState([defaultTask])
    const [loading, setLoading] = useState([true])


    // Lifecycle component control
    useEffect(() => {
        console.log('Task state has been modified')
        setLoading(false)
        return () => {
            console.log('Tasklist is going to unmount')
        };
    }, [tasks]);

    return (
        <div className='grid gap-3 cols-12'>
            <div className='flex flex-row border-b-2 border-indigo-400'>
                <h3 className='text-4xl font-semibold mb-3'>You have 3 tasks for today</h3>
            </div>
            {/* TODO: Aplicar un foreach para renderizar la lista */}
            <div className='grid grid-cols-3 gap-4'>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>
                <TaskComponent task={ defaultTask }></TaskComponent>

            </div>
            <Button otherClasses='bg-indigo-700 flex items-center fixed bottom-0 right-0 mb-16 mx-20 rounded-xl p-3 hover:scale-110'>
                <i class="bi bi-plus-circle mr-2 text-2xl"></i>
                New task
            </Button>
        </div>
    );
}

export default TaskList;
