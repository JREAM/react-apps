import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'
import Home from 'routes/home'

import Dictionary from 'routes/dictionary'
import Password from 'routes/password'
import Stopwatch from 'routes/stopwatch'
import TextSearch from 'routes/textSearch'
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
        path: 'dictionary',
        element: <Dictionary />,
      },
      {
        path: 'password',
        element: <Password />,
      },
      {
        path: 'stopwatch',
        element: <Stopwatch />,
      },
      {
        path: 'textsearch',
        element: <TextSearch />,
      },
      {
        path: 'todo',
        element: <Todo />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
