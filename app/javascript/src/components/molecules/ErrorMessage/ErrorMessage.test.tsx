import React from 'react'
import { create } from 'react-test-renderer'

import { ErrorMessage } from './ErrorMessage'

describe('Molecules/ErrorMessage', () => {
  it('Snap Shot', () => {
    const component = create(
      <ErrorMessage error={{ graphQLErrors: [] }} columnName="name" />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
