import { ApolloError } from '@apollo/client/errors'
import React from 'react'

export const FullErrorMessage: React.FC<{
  error?: ApolloError
}> = ({ error }) => {
  if (!error || !error.graphQLErrors || error.graphQLErrors.length === 0) {
    return <></>
  }
  const messages = error.graphQLErrors
    .filter((it) => it.extensions?.code === 'RECORD_INVALID')
    .map((it) => it.message.split(','))
    .flat()
  /** HACK: Railsのエラーオブジェクトそのまま使っているが、ちょっと構造が複雑でが苦しい感じある */
  return (
    <>
      {messages.map((message, i) => (
        <p key={i} className="text-red-500 text-xs italic">
          {message}
        </p>
      ))}
    </>
  )
}
