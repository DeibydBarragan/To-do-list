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
        <div className='bg-indigo-600 rounded-2xl p-3 shadow-xl transition ease-in-out hover:bg-indigo-800 hover:scale-105'>
            
            <div className=' col-span-9 cursor-pointer'> 
                <h2 className='text-xl font-semibold'>
                    { task.name }
                </h2>
                <h4 className='text-lg col-end-11'>
                    { task.level }
                </h4>
            </div>
            <div className='grid grid-cols-3 gap-2'>
                <button>
                    <i className='bi bi-check-circle-fill text-3xl transition ease-in-out hover:text-slate-400'></i>
                </button>
                <button className='col-start-11'>
                    <i class="bi bi-pencil-fill text-3xl transition ease-in-out hover:text-slate-400"></i>
                </button>
                <button className='col-start-12'>
                    <i class="bi bi-trash-fill text-3xl transition ease-in-out hover:text-slate-300"></i>
                </button>
            </div>
        </div>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task)
};


export default TaskComponent;
