import React from 'react'
import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from './routes/AppRoutes'
import { NavbarContextProvider } from './components/context/navbarContext'
import { TasksContextProvider } from './components/context/tasksContext'
import { ThemeContextProvider } from './components/context/themeContext'
import { AuthContextProvider } from './components/context/authContext'
import { NotificationContextProvider } from './components/context/notificationContext'

/**
 * This is the main component of the app
 * Here we are using the context providers to wrap the app
 * @returns {JSX.Element}
 */
function App () {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <TasksContextProvider>
            <NavbarContextProvider>
              <div className="App dark:bg-gray-900 gap-5 text-white bg-white font-montserrat">
                <AppRoutes/>
              </div>
            </NavbarContextProvider>
          </TasksContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  )
}

export default App
