
import './App.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import TaskList from './components/container/task_list'
import NavbarComponent from './components/navbarComponent';
import Button from './components/pure/button';

function App() {
  return (
    <div className="App bg-gray-900 grid grid-cols-12 text-white">
        <div className='bg-indigo-800 flex flex-col gap-6 p-8 col-span-3 h-screen sticky top-0'> 
          <div className='flex flex-row gap-4 items-center justify-center cursor-pointer'>
            <img className='rounded-full w-12' alt='' src='https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'></img>
            <h2 className='text-2xl'>
              Name
            </h2>
          </div>
          <Button otherClasses='bg-indigo-600'>
            <i class="bi bi-calendar3 mr-2 text-xl"></i>
            <span>All</span>    
          </Button>
          <Button otherClasses='bg-indigo-600'>
            <i class="bi bi-calendar-day mr-2 text-xl"></i>
            Today
          </Button>
          <Button otherClasses='bg-indigo-600'>
            <i class="bi bi-calendar-date mr-2 text-xl"></i>
            Next 7 days
          </Button>
          <Button otherClasses='bg-indigo-600'>
            <i class="bi bi-check2-square mr-2 text-xl"></i>
            Completed
          </Button>
          <div className='mt-auto grid grid-cols-4 gap-3'>
            <Button otherClasses='bg-indigo-600'>
              <i class="bi bi-lightbulb text-3xl"></i>
            </Button>
            <Button otherClasses='bg-indigo-600 col-span-3'>
              Logout
              <i class="bi bi-box-arrow-right ml-2 text-xl"></i>
            </Button>
          </div>
        </div>
        <div className='flex flex-col p-6 gap-3 col-span-8'> 
          <h1 className='text-5xl font-bold'>Today</h1>
          <h3 className='text-2xl font-semibold '>Tuesday, january, 6</h3>
          <TaskList></TaskList> 
        </div>
    </div>
  );
}

export default App;
