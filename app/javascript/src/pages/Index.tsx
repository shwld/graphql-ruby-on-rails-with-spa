import React from 'react'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@/src/hooks/currentUser'

export function Index() {
  const { currentUser, loading } = useCurrentUser()
  if (!loading && currentUser == null)
    return (
      <>
        <a href="/users/sign_in">Sign in</a>
      </>
    )
  return (
    <>
      <Link to="/chat">Go to chat</Link>
    </>
  )
}
