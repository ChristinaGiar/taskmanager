import { React } from 'react'
import { Navigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isLoggedIn } from '../utils/auth'
import { AuthContextProvider } from '../store/auth-context'
import Dashboard from '../components/Dashboard'

const Homepage = () => {
  return (
    <>
      {!isLoggedIn() && <Navigate to='/auth?mode=login' />}

      <AuthContextProvider>
        <DndProvider backend={HTML5Backend}>
          <Dashboard />
        </DndProvider>
      </AuthContextProvider>
    </>
  )
}

export default Homepage
