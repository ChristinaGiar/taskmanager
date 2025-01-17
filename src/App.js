import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Homepage from './pages/Homepage'
import AuthPage from './pages/AuthPage'
import ErrorPage from './pages/ErrorPage'
import { tokenLoader, authAction, logoutAction } from './utils/auth'
import { VerifyPage } from './pages/VerifyPage'
import { AuthContextProvider } from './store/auth-context'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Homepage /> },

      {
        path: 'auth',
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: 'verify',
        element: <VerifyPage />,
      },
    ],
  },
])

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
