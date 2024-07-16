import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'
import Home from 'routes/home'

import Password from 'routes/password'
import Stopwatch from 'routes/stopwatch'
import Todo from 'routes/todo'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'password',
        element: <Password />,
      },
      {
        path: 'todo',
        element: <Todo />,
      },
      {
        path: 'stopwatch',
        element: <Stopwatch />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
