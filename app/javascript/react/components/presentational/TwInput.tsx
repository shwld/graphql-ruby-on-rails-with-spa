import React from 'react'

type Props = {
  value: string
  onChange(value: string): void
}

// type State = {}

const TwInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  )
}

export default TwInput
