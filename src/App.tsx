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
    startWithLetter: false,
    startWithNumber: false,
  })

  useEffect(() => {
    generatePassword()
    console.log('useEffect Load: Create Password')
  }, [])

  const generatePassword = () => {
    let availableChars = ''
    availableChars += settings.lowercase ? 'abcdefghijklmnopqrstuvwxyz' : ''
    availableChars += settings.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''
    availableChars += settings.numbers ? '0123456789' : ''
    availableChars += settings.symbols ? '!@#$%^&*()' : ''

    if (!availableChars) {
      setPassword('You must select an option')
      return
    }

    let newPassword = ''
    for (let i = 0; i < settings.length; i++) {
      newPassword += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
    }
    setPassword(newPassword)
  }

  const onChangeRange = (event: any) => {
    const {value} = event.target
    setSettings({...settings, length: value})
    generatePassword()
  }

  const copyPassword = async() => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(password)
      return
    }
    console.log('Problem w/clipboard')
  }

  const onChangeSettings = (event: any) => {
    const isChecked = event.target.checked

    if (['startWithLetter', 'startWithNumber'].includes(event.target.name)) {
      setSettings({...settings, [event.target.name]: isChecked})
      console.log(1)
    }

    setSettings({
      ...settings,
      [event.target.id]: Boolean(isChecked)
    })
    generatePassword( )
    console.log(settings)
    console.log(`event = ${event.target.id}: ${isChecked}`)
    // @ts-ignore
    console.log(`settings[${event.target.name}] = ${settings[event.target.id]}`)
    console.log('@TODO: The state value is one iteration behind')
  }

  return (
    <div className='container-sm'>
      <div className='row'>
        <div className='col text-center'>
          <h1>Password Generator</h1>
          <p>Hard to get more minimal than this React app.</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-auto offset-4'>
          <input readOnly type='text' className='form-control border border-secondary' value={password} />
        </div>
        <div className='col-auto'>
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
        </div>
        <div className='col-auto'>
          <button type='submit' onClick={generatePassword} className='btn btn-primary mb-3'>
            Refresh
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-auto offset-4'>
          <label className='form-label'>
            Length: <span className='badge bg-primary'>{settings.length}</span>
          </label>
          <input
            type='range'
            onChange={onChangeRange}
            className='form-range'
            min='6'
            max='32'
            step='1'
            value={settings.length}
          />
        </div>
      </div>
      <div className='row offset-4 margin-top'>
        <div className='col-auto'>
          <CheckboxSetting name='uppercase' checked={settings.uppercase} onChange={onChangeSettings} />
          <CheckboxSetting name='lowercase' checked={settings.lowercase} onChange={onChangeSettings} />
        </div>
        <div className='col-auto'>
          <CheckboxSetting name='numbers' checked={settings.numbers} onChange={onChangeSettings} />
          <CheckboxSetting name='symbols' checked={settings.symbols} onChange={onChangeSettings} />
        </div>
        <div className='col-auto'>
          <div className='form-check form-switch'>
            <input
              name='forceStartWith'
              id='startWithLetter'
              className='form-check-input'
              onChange={onChangeSettings}
              type='radio'
              role='switch'
              checked={settings.startWithLetter}
            />
            <label className='form-check-label' htmlFor='startWithLetter'>
              Start with Letter
            </label>
          </div>
          <div className='form-check form-switch'>
            <input
              name='forceStartWith'
              id='startWithNumber'
              className='form-check-input'
              onChange={onChangeSettings}
              type='radio'
              role='switch'
              checked={settings.startWithNumber}
            />
            <label className='form-check-label' htmlFor='startWithNumber'>
              Start with Number
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
