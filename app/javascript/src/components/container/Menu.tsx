import { useCurrentUser } from '@/src/hooks/currentUser'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

// type State = {}

export const Menu: React.FC<Props> = ({ children }) => {
  const { currentUser } = useCurrentUser()
  return (
    <>
      {currentUser && (
        <ul className="flex items-center justify-end p-6 bg-teal-500">
          <li className="mr-6">
            <Link to="/chat" className="text-white hover:text-yellow-800">
              {currentUser.email}
            </Link>
          </li>
          <li>
            <a href="/users/sign_out" data-method="delete">
              Sign out
            </a>
          </li>
        </ul>
      )}
      {!currentUser && (
        <ul className="flex items-center justify-end p-6 bg-teal-500">
          <li className="mr-6">
            <a href="/users/sign_in">Sign in</a>
          </li>
          <li>
            <a href="/users/sign_up">Sign up</a>
          </li>
        </ul>
      )}
      {children}
      {!currentUser && <div>Please sign in</div>}
    </>
  )
}
