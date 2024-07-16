import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Home from '../routes/home'

// describe is used to group tests together.
// test is used to define a test case.
// render renders the component.
// screen provides access to DOM elements.
// expect is used for assertions.

describe('Home', () => {
  it('renders headline', () => {
    render(<Home />)
    screen.debug()
    expect(screen.getByText('React Apps')).toBeDefined()
    // check if App components renders headline
  })
})
