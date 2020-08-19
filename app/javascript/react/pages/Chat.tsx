import { useCurrentUser } from '@/react/hooks/currentUser'
import React, { useState, useEffect } from 'react'
import { TwCard, TwInput, TwButton } from '../components/presentational/Tw'
import { useSayMutation, useOnMessageAddedSubscription } from '../graphql'

type Props = {}

export const Chat: React.FC<Props> = () => {
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const { currentUser } = useCurrentUser()
  const [mutate, { error, loading }] = useSayMutation({
    variables: {
      input: {
        text: `React: ${text}`,
      },
    },
  })
  const messageAdded = useOnMessageAddedSubscription()
  useEffect(() => {
    const message = messageAdded.data?.onMessageAdded.message
    if (!message) return
    setMessages((oldMessages) => [...oldMessages, message])
  }, [messageAdded.data?.onMessageAdded, setMessages])
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate()
          }}
        >
          <TwCard>
            <p>This is example chat app!</p>
            Hello {currentUser ? currentUser.email : 'loading'}
            <p className="pt-10">Say!</p>
            <TwInput
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            />
            <TwButton className="w-full mt-3" disabled={loading}>
              Submit
            </TwButton>
            {error && <span>{{ error }}</span>}
          </TwCard>
        </form>
        <div className="mt-5">
          {messages.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
      </div>
    </>
  )
}
