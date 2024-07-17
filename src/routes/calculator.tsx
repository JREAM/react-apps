import React, { useState } from 'react'
import './calculator.css'

// Redo this in bootstrap grid CSS

export default () => {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString())
      } catch (e) {
        setResult('Error')
      }
    } else if (value === 'C') {
      setInput('')
      setResult('')
    } else {
      setInput(input + value)
    }
  }

  return (
    <div className='calculator'>
      <div className='calculator-display'>
        <div className='calculator-input'>{input}</div>
        <div className='calculator-result'>{result}</div>
      </div>
      <div className='calculator-buttons'>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}
