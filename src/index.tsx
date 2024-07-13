import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'
import Password from 'routes/password'
import Home from 'routes/home'

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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
