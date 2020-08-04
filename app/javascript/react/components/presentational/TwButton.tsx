import React from 'react'

type Props = {}

// type State = {}

const TwButton: React.FC<Props> = ({ children }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <slot />
    </button>
  )
}

export default TwButton
