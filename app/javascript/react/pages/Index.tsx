import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

// type State = {}

export const Index: React.FC<Props> = () => {
  return (
    <>
      <Link to="/chat">Go to chat</Link>
    </>
  )
}
