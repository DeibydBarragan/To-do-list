import { React, useContext } from 'react'
import { ThemeContext } from '../../../context/themeContext'

const ButtonTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button className='btn' onClick={handleTheme}>
      <i className="bi bi-lightbulb text-3xl"></i>
    </button>
  )
}

export default ButtonTheme
