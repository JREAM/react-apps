import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import Layout from './layout'
import ErrorPage from './error-page'
import Home from 'routes/home'

import Calculator from 'routes/calculator'
import Dictionary from 'routes/dictionary'
import Password from 'routes/password'
import SearchText from 'routes/searchText'
import Stopwatch from 'routes/stopwatch'
import SearchBible from 'routes/searchBible'
import Todo from 'routes/todo'

import ElementsButtons from 'routes/elements/buttons'
import ElementsInputs from 'routes/elements/inputs'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'calculator',
        element: <Calculator />,
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
        path: 'searchbible',
        element: <SearchBible />,
      },
      {
        path: 'searchtext',
        element: <SearchText />,
      },
      {
        path: 'todo',
        element: <Todo />,
      },
      {
        path: 'elements/buttons',
        element: <ElementsButtons />,
      },
      {
        path: 'elements/inputs',
        element: <ElementsInputs />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
