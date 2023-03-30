import React from 'react'
import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from './routes/AppRoutes'
import { ModalContextProvider } from './components/context/ModalContext'
import { NavbarContextProvider } from './components/context/navbarContext'
import { TasksContextProvider } from './components/context/tasksContext'
import { ThemeContextProvider } from './components/context/themeContext'
import { AuthContextProvider } from './components/context/authContext'

function App () {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <TasksContextProvider>
          <NavbarContextProvider>
            <ModalContextProvider>
              <div className="App dark:bg-gray-900 gap-5 text-white bg-white font-montserrat">
                <AppRoutes/>
              </div>
            </ModalContextProvider>
          </NavbarContextProvider>
        </TasksContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}

export default App
