import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import VerificationPage from './pages/VerificationPage'
import { useIsLoginQuery } from './services/authApi'
import Loader from './components/Inputs/Loader'
import { useDispatch } from 'react-redux'
import { setLogin, setLogout } from './features/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import Expenses from './pages/Dashboard/Expense'


function App() {

  const { data, isFetching, isError, error } = useIsLoginQuery();
  const dispatch = useDispatch();

  if (isError) {
    alert(error.data.message)
  }



  if (!data?.isLogin) {
    dispatch(setLogout());
  } else {
    dispatch(setLogin(data.user))
  }





  if (isFetching) {
    return <Loader />
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/income',
      element: (
        <ProtectedRoute>
          <Income />
        </ProtectedRoute>
      )
    },
    {
      path: '/expense',
      element: (
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      )
    },
    {
      path: '/getVerificationEmail',
      element: (
        // <ProtectedRoute>
        <VerificationPage />
        //  </ProtectedRoute> 
      )
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
