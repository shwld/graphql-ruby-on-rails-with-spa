import React from 'react'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@/src/hooks/currentUser'

type Props = object

// type State = {}

export const Index: React.FC<Props> = () => {
  const { currentUser } = useCurrentUser()
  if (!currentUser) return <></>
  return (
    <>
      <Link to="/chat">Go to chat</Link>
    </>
  )
}
