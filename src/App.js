import React from 'react'
import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from './routes/AppRoutes'
import { NavbarContextProvider } from './components/context/navbarContext'
import { TasksContextProvider } from './components/context/tasksContext'
import { ThemeContextProvider } from './components/context/themeContext'
import { AuthContextProvider } from './components/context/authContext'
import { NotificationContextProvider } from './components/context/notificationContext'

function App () {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <TasksContextProvider>
          <NavbarContextProvider>
            <NotificationContextProvider>
              <div className="App dark:bg-gray-900 gap-5 text-white bg-white font-montserrat">
                <AppRoutes/>
              </div>
            </NotificationContextProvider>
          </NavbarContextProvider>
        </TasksContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}

export default App
