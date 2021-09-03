import React from 'react'

import { ChatForm } from '../components/organisms/ChatForm'
import { CommentList } from '../components/organisms/CommentList'

export function Chat() {
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10">
        <ChatForm />
        <CommentList className="mt-5" />
      </div>
    </>
  )
}
