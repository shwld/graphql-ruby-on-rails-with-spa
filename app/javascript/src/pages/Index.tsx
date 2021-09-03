import React from 'react'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@/src/hooks/currentUser'

export function Index() {
  const { currentUser } = useCurrentUser()
  if (!currentUser) return <></>
  return (
    <>
      <Link to="/chat">Go to chat</Link>
    </>
  )
}
