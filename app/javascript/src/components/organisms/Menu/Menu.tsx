import React from 'react'
import { Link } from 'react-router-dom'

import { UserItemFragment } from '@/graphql/generated'
import { useCurrentUser } from '@/src/hooks/currentUser'

export const MenuTemplate: React.VFC<{
  currentUser: UserItemFragment
}> = ({ currentUser }) => {
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
      {!currentUser && <div>Please sign in</div>}
    </>
  )
}

export const Menu: React.VFC = () => {
  const { currentUser } = useCurrentUser()
  if (currentUser == null) return <></>

  return <MenuTemplate currentUser={currentUser} />
}
