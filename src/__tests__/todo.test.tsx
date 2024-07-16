import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, test } from 'vitest'

import Todo from '../routes/todo'

// test('should increase count by 1', () => {
//   render(<Todo />)

//   const count = screen.getByTestId('count')
//   const button = screen.getByText('Increase')

//   fireEvent.click(button)
//   // Assert
//   expect(count.textContent).toBe('1')
// })
