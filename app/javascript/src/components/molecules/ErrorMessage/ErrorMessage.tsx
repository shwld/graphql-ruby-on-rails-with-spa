import { ApolloError } from '@apollo/client'
import React from 'react'

export const ErrorMessage: React.FC<{
  error?: Pick<ApolloError, 'graphQLErrors'>
  columnName: string
}> = ({ error, columnName }) => {
  if (!error || !error.graphQLErrors || error.graphQLErrors.length === 0) {
    return <></>
  }
  const recordInvalidErrors = error.graphQLErrors.filter(
    (it) => it.extensions?.code === 'RECORD_INVALID'
  )
  /** HACK: Railsのエラーオブジェクトそのまま使っているが、ちょっと構造が複雑でが苦しい感じある */
  const errors = recordInvalidErrors
    .map(
      (it) =>
        (it.extensions?.record?.errors as {
          [columnName: string]: string[]
        }[]) || []
    )
    .flat()
  return (
    <>
      {errors
        .filter((it) => it[columnName])
        .map((it, i) => (
          <p key={i} className="text-red-500 text-xs italic">
            {(it[columnName] || []).map((e: string, j: number) => (
              <React.Fragment key={j}>
                {e}
                <br />
              </React.Fragment>
            ))}
          </p>
        ))}
    </>
  )
}
