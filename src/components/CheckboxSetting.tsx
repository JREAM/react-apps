import * as React from 'react'

interface ICheckbox {
  name: string
  onChange: (event: any) => void
  checked?: boolean
}

export default function CheckboxSetting(obj: ICheckbox) {
  return (
    <div className='form-check form-switch'>
      <input
        name={obj.name}
        id={obj.name}
        className='form-check-input'
        onChange={obj.onChange}
        type='checkbox'
        role='switch'
        checked={obj.checked}
      />
      <label className='form-check-label' htmlFor={obj.name}>
        {obj.name}
      </label>
    </div>
  )
}
