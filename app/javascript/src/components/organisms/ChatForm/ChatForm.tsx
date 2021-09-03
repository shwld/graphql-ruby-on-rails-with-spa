import { ApolloError } from '@apollo/client/errors'
import React, { useState } from 'react'

import { Button, Card, Input } from '../../atoms'
import { FullErrorMessage } from '../../molecules/FullErrorMessage'

import { SayInput, useSayMutation } from '@/graphql/generated'
import { useCurrentUser } from '@/src/hooks/currentUser'

export const ChatFormTemplate: React.VFC<{
  error?: ApolloError
  children?: React.ReactNode
  submitting?: boolean
  className?: string
  onSubmit(input: SayInput): void
}> = ({ submitting, children, error, className = '', onSubmit }) => {
  const [text, setText] = useState<string>('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ text })
      }}
      className={className}
    >
      <Card>
        {children}
        <p className="pt-10">Say!</p>
        <Input defaultValue={text} onChange={(e) => setText(e.target.value)} />
        <FullErrorMessage error={error} />
        <Button className="w-full mt-3" disabled={submitting}>
          Submit
        </Button>
      </Card>
    </form>
  )
}

export const ChatForm: React.VFC<{ className?: string }> = ({ className }) => {
  const { currentUser } = useCurrentUser()
  const [mutate, { error, loading }] = useSayMutation()

  if (!currentUser) return <></>
  return (
    <ChatFormTemplate
      onSubmit={(input) => {
        mutate({ variables: { input } })
      }}
      submitting={loading}
      error={error}
      className={className}
    >
      <p>This is example chat app!</p>
      Hello {currentUser ? currentUser.email : 'loading'}
      <p className="pt-10">Say!</p>
    </ChatFormTemplate>
  )
}
