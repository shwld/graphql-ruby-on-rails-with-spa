import React from 'react'

import { CommentList } from '../components/organisms/CommentList'

export function Chat() {
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10">
        <Chat />
        <CommentList className="mt-5" />
      </div>
    </>
  )
}
