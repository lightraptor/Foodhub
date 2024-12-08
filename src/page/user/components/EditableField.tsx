import React from 'react'

interface EditableFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}

export const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input
        type={type}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
