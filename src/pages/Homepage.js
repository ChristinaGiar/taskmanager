import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isLoggedIn } from '../utils/auth'
import Dashboard from '../components/Dashboard'
import AuthContext from '../store/auth-context'

const Homepage = () => {
  const crx = useContext(AuthContext)

  useEffect(() => {
    const userActivityUpdate = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          'getUserActivity?id=' +
          localStorage.getItem('userId')
      )
      const user = await response.json()
      if (user.userActivity) {
        const { items, statuses, themeColor } = user.userActivity
        crx.getUserActivityHandler(items, statuses, themeColor)
      }
      crx.setDataIsLoadedHandler(true)
    }
    isLoggedIn() && userActivityUpdate()
  }, [])

  return (
    <>
      {!isLoggedIn() && <Navigate to='/auth?mode=login' />}

      {crx.dataIsLoaded && (
        <DndProvider backend={HTML5Backend}>
          <Dashboard />
        </DndProvider>
      )}
    </>
  )
}

export default Homepage
