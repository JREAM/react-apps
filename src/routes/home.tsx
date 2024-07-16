import * as React from 'react'

export default function Home() {
  return (
    <>
      <h1>React Apps</h1>
      <p className='col-md-4'>
        This is a minimal React setup for creating components in TypeScript. It's not intended to be beautiful in
        appearance nor a complex project. Normally I would separate components, types and logic into separate files. I
        want to keep this simple without anyone having to jump through directories. It's a playground!
      </p>

      <ul className='list-group col-md-4'>
        <li className='list-group-item'>TypeScript</li>
        <li className='list-group-item'>Vite</li>
        <li className='list-group-item'>React</li>
        <li className='list-group-item'>React Router</li>
        <li className='list-group-item'>Bootstrap 5</li>
        <li className='list-group-item'>
          Single File Components <em>(Avoid this in real applications)</em>
        </li>
        <li className='list-group-item'></li>
      </ul>
    </>
  )
}
