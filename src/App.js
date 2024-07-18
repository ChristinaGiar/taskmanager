import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Homepage from './pages/Homepage'
import AuthPage, { authAction } from './pages/AuthPage'
import ErrorPage from './pages/ErrorPage'
import { tokenLoader } from './utils/auth'
import { logoutAction } from './components/Logout'
import { VerifyPage } from './pages/VerifyPage'

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
  const path = window.location.pathname
  console.log(path)
  return <RouterProvider router={router} />
}

export default App
