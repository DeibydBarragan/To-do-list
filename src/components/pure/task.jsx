import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';


const TaskComponent = ({ task }) => {
    useEffect(() => {
        console.log('Created task')
        return () => {
            console.log(`Task ${ task.name } is going to unmound`)
        }
    }, [task])

    return (
        <div className='grid grid-cols-12 bg-indigo-700 rounded-2xl p-2 gap-3 shadow-xl'>
            <button >
                <i className='bi bi-circle text-3xl'></i>
            </button>
            <h2 className='text-2xl'>
                { task.name }
            </h2>
            <h4 className='text-xl col-end-11'>
                { task.level }
            </h4>
            <button className='col-start-11'>
                <i class="bi bi-pencil-fill text-3xl"></i>
            </button>
            <button className='col-start-12'>
                <i class="bi bi-trash-fill text-3xl"></i>
            </button>
        </div>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task)
};


export default TaskComponent;
