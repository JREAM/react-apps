import * as React from 'react'
import { useState, useEffect } from 'react'
// @ts-ignore (issue with vite and paths w/typescript)
import CheckboxSetting from '@/components/CheckboxSetting'

export default () => {
  const [password, setPassword] = useState('')
  const [settings, setSettings] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    length: 8,
    startWith: 'letter',
  })

  /** Onload fill password */
  useEffect(() => {
    generatePassword()
    console.log('useEffect Load: Create Password')
  }, [])

  /** Main logic */
  const generatePassword = () => {
    const { uppercase, lowercase, symbols, numbers, startWith } = settings
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const symbolChars = '!@#$%^&*()'
    const numberChars = '0123456789'

    let charPool = uppercaseChars + lowercaseChars + symbolChars + numberChars
    let newPassword = ''

    // const remainingLength = 12 - newPassword.length
    for (let i = 0; i < settings.length; i++) {
      newPassword += charPool.charAt(Math.floor(Math.random() * charPool.length))
    }

    setPassword(
      newPassword
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('')
    )
  }

  /** Handle Range Adjustment */
  const handleRangeChange = (event: any) => {
    const { value } = event.target
    setSettings({ ...settings, length: value })
    generatePassword()
  }

  /** Copy Password to Clipboard */
  const copyPassword = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(password)
      return
    }
  }

  /** Toggle the Buttons */
  const handleSettingsChange = (event: any) => {
    const { name, id, value, type, checked } = event.target

    // 1. Preserve existing values (...spread)
    // 2. Save the value
    //   a. If checkbox use boolean value of checked
    //   b. If not use the value
    setSettings({
      ...settings, // Preserve existing values
      [id]: type === 'checkbox' ? checked : value,
    })

    // @TODO
    // If startWith is set to letter/number/symbol make sure the box is ticked
    if (id === 'startWith' && checked !== false) {
      if (['letter', 'number', 'symbol'].includes(value)) {
        setSettings({ ...settings, [value]: checked })
      }
    }

    generatePassword()
    // console.log(settings)
    // console.log(`event = ${id}: ${checked}`)
    // @ts-ignore
    // console.log(`settings[${name}] = ${settings[id]}`)
    // console.log('@TODO: The state value is one iteration behind')
  }

  return (
    <>
      <h1>Password Generator</h1>
      <p>Simple Password Generator in React.</p>
      <input readOnly type='text' className='form-control border border-secondary' value={password} />
      <button type='submit' onClick={copyPassword} className='btn btn-secondary mb-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-copy'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z'
          />
        </svg>
      </button>
      <button type='submit' onClick={generatePassword} className='btn btn-primary mb-3'>
        Refresh
      </button>
      <label className='form-label'>
        Length: <span className='badge bg-primary'>{settings.length}</span>
      </label>
      <input
        type='range'
        onChange={handleRangeChange}
        className='form-range'
        min='6'
        max='32'
        step='1'
        value={settings.length}
      />
      <CheckboxSetting name='uppercase' checked={settings.uppercase} onChange={handleSettingsChange} />
      <CheckboxSetting name='lowercase' checked={settings.lowercase} onChange={handleSettingsChange} />
      <CheckboxSetting name='numbers' checked={settings.numbers} onChange={handleSettingsChange} />
      <CheckboxSetting name='symbols' checked={settings.symbols} onChange={handleSettingsChange} />
      <div className='form-check form-switch'>
        <input
          name='startWith'
          id='startWithLetter'
          className='form-check-input'
          onChange={handleSettingsChange}
          type='radio'
          role='switch'
          checked={settings.startWith === 'letter' ? true : false}
        />
        <label className='form-check-label' htmlFor='startWithLetter'>
          Start with Letter
        </label>
      </div>
      <div className='form-check form-switch'>
        <input
          name='startWith'
          id='startWithNumber'
          className='form-check-input'
          onChange={handleSettingsChange}
          type='radio'
          role='switch'
          checked={settings.startWith === 'number' ? true : false}
        />
        <label className='form-check-label' htmlFor='startWithNumber'>
          Start with Number
        </label>
      </div>
      <div className='form-check form-switch'>
        <input
          name='startWith'
          id='startWithSymbol'
          className='form-check-input'
          onChange={handleSettingsChange}
          type='radio'
          role='switch'
          checked={settings.startWith === 'symbol' ? true : false}
        />
        <label className='form-check-label' htmlFor='startWithSymbol'>
          Start with Symbol
        </label>
      </div>
    </>
  )
}
