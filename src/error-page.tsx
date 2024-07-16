import * as React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  // console.error(error)

  return (
    <div className='container-fluid position-relative mt-5'>
      <div className='text-center'>
        <h1>Yikes!</h1>
        <p>Sorry, there was an unexpected error. </p>
        <p>
          {/* @ts-ignore */}
          <code>{error?.statusText || error?.message}</code>
        </p>
      </div>
    </div>
  )
}
