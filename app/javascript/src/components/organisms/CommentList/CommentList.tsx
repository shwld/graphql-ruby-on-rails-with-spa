import React, { useEffect, useState } from 'react'

import { useOnMessageAddedSubscription } from '@/graphql/generated'

export const CommentListTemplate: React.VFC<{
  messages: string[]
  className?: string
}> = ({ messages, className = '' }) => {
  return (
    <div className={className}>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </div>
  )
}

export const CommentList: React.VFC<{ className?: string }> = ({
  className,
}) => {
  const [messages, setMessages] = useState<string[]>([])
  const messageAdded = useOnMessageAddedSubscription()
  useEffect(() => {
    const message = messageAdded.data?.onMessageAdded.message
    if (!message) return
    setMessages((oldMessages) => [...oldMessages, message])
  }, [messageAdded.data?.onMessageAdded, setMessages])

  return <CommentListTemplate messages={messages} className={className} />
}
