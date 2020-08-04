import React from 'react'

type Props = {}

// type State = {}

const TwCard: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}

export default TwCard
