import { useCurrentUser } from '@/src/hooks/currentUser'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

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
