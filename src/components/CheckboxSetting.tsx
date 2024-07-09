import * as React from 'react'

export default function CheckboxSetting({name , onChange, checked = false}: any) {
  return (
    <div className='form-check form-switch'>
      <input
        name={name}
        id={name}
        className='form-check-input'
        onChange={onChange}
        type='checkbox'
        role='switch'
        checked={checked}
      />
      <label className='form-check-label' htmlFor={name}>
        {name}
      </label>
    </div>
  )
}
