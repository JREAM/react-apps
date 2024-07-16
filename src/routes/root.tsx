import * as React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
            <h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'>
              <span>Navigation</span>
            </h6>
            <ul className='ul-flex'>
              <li className='nav-item'>
                <NavLink to='/' className='nav-link'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/password' className='nav-link'>
                  Password
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/stopwatch' className='nav-link'>
                  Stopwatch
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/todo' className='nav-link'>
                  Todo
                </NavLink>
              </li>
            </ul>
          </nav>
          <main className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4' role='main'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
